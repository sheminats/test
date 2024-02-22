const mongoose=require("mongoose")



const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
   description:{
        type:String,
        required:true
    },
    starrer:{
        type:String,
        required:true 
    },
   genre:{
        type:String,
        required:true 
    },

   releaseDate:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required:true
   
    },
    movieImage:{
        type:String,
        required:true
    },
    bookings:[{type:mongoose.Types.ObjectId,ref:"bookings"}],

})

const movies=mongoose.model("movies",movieSchema)



module.exports=movies