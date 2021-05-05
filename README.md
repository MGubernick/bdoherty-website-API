# BDoherty Pottery Website - API

This is the repository for the BDoherty Pottery API, BDoherty Pottery is a website that allows users the opportunity to browse through and even purchase some of the beautiful works of the Chicago based artist, Bridget Doherty. A user can browse the site at their leasure but if they are interested in purhcasing an item, they will have to sign-up/sign-in with an account they can create. Once they are signed in, they will be able to add/remove items to their cart and checkout from there.

## Set up and Installation instructions:
1. To use this application, you simply need to ensure you are using the correct url in API Requests.
  -  Please be sure to update your application settings to communicate with this url:
    https://bdpottery.herokuapp.com/
3. Be sure to follow endpoint instructions below for correct endpoints
4. Enjoy!


### Authentication:
| Action | Method | Endpoint |
| ----------- | ----------- | ----------- |
| Sign-Up | POST | /sign-up
| Sign-In | POST  | /sign-in
| Change-Password |  PATCH | /change-pw
| Sign-Out | DELETE | /delete



### Items: (Options Only Available To Admin)
| Routes | Method | Endpoint |
| ----------- | ----------- | ----------- |
| Create | POST | /items
| Index All | GET | /items/all
| Sold Items | GET | /items/sold
| Show One| GET | /items/:id
| Update | PATCH | /items/:id
| Update Cart| PATCH | /items-incart/:id
| Delete | DELETE | /items/:id



### Cart:
| Routes | Method | Endpoint |
| ----------- | ----------- | ----------- |
| Add To Cart | POST | /toMyCart
| Remove From Cart | DELETE | /fromMyCart/:id
| Stripe Checkout | POST | /checkout

## Other Important Links & Resources Used:
**Links**
- [BDoherty-Pottery front-end Repo](https://github.com/MGubernick/bdoherty-website)
- [Deployed API](https://bd-pottery.herokuapp.com/)
- [Deployed App](https://mgubernick.github.io/bdoherty-website/#/)

**Website Resources**

- [stackOverflow](stackOverflow.com)
- [Stripe Docs](https://stripe.com/docs/payments/checkout/migration)
- [Stripe Checkout Repo](https://github.com/azmenak/react-stripe-checkout)

## Technologies Used:
- JavaScript
- Express
- MongoDB
- Mongoose
- Stripe
- crypto
- bcrypt
- Heroku
