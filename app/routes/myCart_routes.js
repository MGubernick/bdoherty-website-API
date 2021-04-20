const express = require('express')
const passport = require('passport')
// stripe with test key
const stripe = require('stripe')('sk_test_51IcvQ1BhI8SMmaQRjwalv91uOnDxj9Ym8S5KQkJNHy1gYIhJCud8iH2enhrtuTtUGZ4zOV6C3069twTvY7ngOJtB00ZKqYioTh')

const { v4: uuid } = require('uuid')

// create a router so our code is more modular
const router = express.Router()

const handle404 = require('./../../lib/custom_errors')
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else

const requireToken = passport.authenticate('bearer', { session: false })

const User = require('./../models/user.js')

// Add Item to myCart
router.post('/toMyCart', requireToken, (req, res, next) => {
  const itemInfo = req.body.cartItem

  const userID = itemInfo.shopper

  User.findOne({ _id: userID })
    .then(handle404)
    .then(shopper => {
      shopper.myCart.push(itemInfo)

      return shopper.save()
    })
    .then(user => res.status(201).json({ user: user }))
    .catch(next)
})

// Remove Item from myCart

router.delete('/fromMyCart/:id', requireToken, (req, res, next) => {
  const itemId = req.params.id
  const userID = req.user._id

  User.findById(userID)
    .then(handle404)
    .then(user => {
      user.myCart.id(itemId).remove()
      return user.save()
    })
    .then(user => res.status(200).json({ user: user }))
    .catch(next)
})

// checkout with Stripe
// Terminal says I'm passing an object somewhre I shouldn't be...

router.post('/checkout', async (req, res) => {
  console.log('Request: ', req.body)

  let error
  let status
  try {
    const { token, price } = req.body
    // console.log('this is price: ', price)

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotencyKey = uuid()
    const charge = await stripe.charges.create(
      {
        amount: price,
        currency: 'USD',
        customer: customer.id,
        receipt_email: token.email,
        description: 'Congrats on purchasing a sweet piece!',
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    )
    console.log('Charge:', { charge })
    status = 'success'
  } catch (error) {
    console.error('Error:', error)
    status = 'failure'
  }

  res.json({ error, status })
})

// export the router
module.exports = router
