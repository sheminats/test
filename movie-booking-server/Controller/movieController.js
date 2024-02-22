
const movies=require('../Models/movieModel');
const { findById } = require('../Models/userModel');

//add movie
exports.addMovie=async(req,res)=>{
    console.log("inside Add movie api");
    const id=req.payload
 const{title,description,starrer,genre,releaseDate,language}=req.body
    const movieImage=req.file.filename
 // console.log(id);
    console.log(title,description,starrer,genre,releaseDate,language,movieImage,id);
// res.status(200).json("add project received")
try{
        const existingMovie=await movies.findOne({title})
        if(existingMovie){
            res.status(406).json("Movie already exists..please upload another movie!!")
        }else{
            //add movie
            const newMovie= new movies({
                title,description,starrer,genre,releaseDate,language,movieImage,id
            })
            await newMovie.save()
            res.status(200).json(newMovie)

        }
    }catch(err){
        res.status(401).json(err)
    }
}





//get home movie
exports.getHomeMovie=async(req,res)=>{
    try{
const homeMovies=await movies.find().limit(3)
res.status(200).json(homeMovies)
    }catch(err){
        res.status(401).json(err)
    }
}


//get all movies
exports.getAllMovie=async(req,res)=>{
    try{
const allMovies=await movies.find()
res.status(200).json(allMovies)
    }catch(err){
        res.status(401).json(err)
    }
}

//get  movies for each admin

exports.getAdminMovie=async(req,res)=>{
    const id=req.payload
    // console.log(`${req.header}`);
    try{
const adminMovies=await movies.find({id})
res.status(200).json(adminMovies)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getMovieById=async(req,res,next)=>{
    const {pid}=req.params
    const id=req.payload
    let movie;
    try{
const movie=await movies.findById({_id:pid})
res.status(200).json(movie)
    }catch(err){
        console.log(err);
    }
    // if(!movie){
    //    res.status(404).json({message:"invalid movie id"})

    // }
//  res.status(200).json({movie})
}

//remove project
exports.removeMovie=async(req,res)=>{
    console.log("Inside remove movie");
    const {pid}=req.params
    try{
const movieDetails=await movies.findByIdAndDelete({_id:pid})
res.status(200).json(movieDetails)
    }catch(err){
        res.status(401).json(err)
    }
}