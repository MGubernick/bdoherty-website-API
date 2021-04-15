const mongoose = require('mongoose')

const myCartSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true
  },
  shopper: {
    type: String,
    required: true
  }
}, {
  // options go in the second object
  timestamps: true
})

// export the review Schema so we can use it in restaurantSchema
module.exports = myCartSchema
