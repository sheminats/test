const bookings = require("../Models/bookingModel");

exports.createBooking = async (req, res) => {
  // console.log("inside create booking");
  try {
      const {  bookingDate, seatNumber, showTime } = req.body;
      const users_id=req.payload
      const movies_id=req.params.pid
console.log("booking details",users_id ,movies_id,bookingDate, seatNumber, showTime );
    // new booking
      const booking = new bookings({
          users_id,
          movies_id,
          bookingDate,
          seatNumber,
          showTime,
          status: 'booked' 
      });


      await booking.save();

      res.status(200).json({ message: 'Booking created successfully', booking });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getUserBookings=async(req,res)=>{
  console.log("booking api");
  // console.log(`${req.headers}`);
  const userId=req.payload
  console.log(userId);
  try{
const userBookings=await bookings.find({users_Id:userId})
console.log(userBookings);
res.status(200).json(userBookings)
  }catch(err){
      res.status(401).json(err)
  }
}













// //delete booking
// exports.removeBooking=async(req,res)=>{
//   console.log("Inside remove booking");
//   const {pid}=req.params
//   try{
// const bookingDetails=await bookings.findByIdAndDelete({_id:pid})
// res.status(200).json("deleted")
//   }catch(err){
//       res.status(401).json(err)
//   }
// }