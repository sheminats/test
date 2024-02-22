const users=require('../Models/userModel')
const jwt=require('jsonwebtoken')

//register request
exports.register=async(req,res)=>{
    console.log("Inside Register Api");
    const{username,email,password}=req.body
    console.log(username,email,password);
    try{
const existingUser=await users.findOne({email})
console.log(existingUser);
if(existingUser){
    res.status(406).json("Account already exists..Please Login!!!")

}else{
//add user to collection
const newUser=new users({
    username,email,password
})
newUser.save()
res.status(200).json(newUser)

}

    }catch(err){
        res.status(401).json(err)

    }

}


///login
exports.login=async(req,res)=>{
    console.log("INSIDE REGISTER API");
    const{email,password}=req.body
    console.log(email,password);
    try{
    const existingUser=await users.findOne({email,password})
    console.log(existingUser);
    if(existingUser){
        const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET_KEY)
        res.status(200).json({existingUser,token})
    }else{
        res.status(404).json("Invalid Email/Password!!!")
    }
    }catch(err){
    res.status(401).json(err)
    }
    }
    