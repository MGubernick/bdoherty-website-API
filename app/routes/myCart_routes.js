const express = require('express')
const passport = require('passport')
// create a router so our code is more modular
const router = express.Router()
// this is a collection of methods that help us detect situations when we need
// to throw a custom error
// require the handle404 middleware, to handle not finding documents
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
    .then(() => res.sendStatus(200))
    .catch(next)
})

// export the router
module.exports = router
