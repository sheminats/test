const express=require('express')
const userController=require('../Controller/userController')
const router=new express.Router()
const movieController=require('../Controller/movieController')
const adminController=require('../Controller/adminController')
const multerConfig = require('../Middleware/multerMiddleware')
const jwtMiddleware =require('../Middleware/jwtMiddleware')
const bookingController=require('../Controller/bookingController')




//USERS
//register api
router.post('/register',userController.register)

//login api
router.post('/login',userController.login)



//ADMINS

router.post('/signup',adminController.addAdmin)
router.post('/admin/login',adminController.adminLogin)

//add-movies api
router.post('/add-movie',jwtMiddleware,multerConfig.single('movieImage'),movieController.addMovie)

//get home movies api
router.get('/home-movie',movieController.getHomeMovie)

//get all movies api
router.get('/all-movie',jwtMiddleware,movieController.getAllMovie)

//get admin movies
router.get('/admin-movie',jwtMiddleware,movieController.getAdminMovie)

//get movie by id
router.get('/all-movie/:pid',jwtMiddleware,movieController.getMovieById)

router.delete('/remove-movie/:pid',jwtMiddleware,movieController.removeMovie)

//book movie
router.post('/booking/:pid',jwtMiddleware,bookingController.createBooking)

//get booking by id
router.get('/userbooking',jwtMiddleware, bookingController.getUserBookings);

// //delete boooking
// router.delete('/remove-booking/:pid',jwtMiddleware,bookingController.removeBooking)



//exporting router
module.exports=router