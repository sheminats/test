const mongoose = require("mongoose")



const bookingSchema = new mongoose.Schema({
  users_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  movies_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies',
    required: true
  },
  bookingDate: {
    type: String,
    required: true
  },
  seatNumber: {
    type: String,
    required: true
  },

  showTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'canceled'],
    default: 'booked'
  }

})

const bookings = mongoose.model("bookings", bookingSchema)



module.exports = bookings