const Admin=require('../Models/adminModel')
require('dotenv').config()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')


exports.addAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    // Validation check for email and password
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(406).json("Invalid inputs");
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }

    if (existingAdmin) {
        const token=jwt.sign({id:existingAdmin._id},process.env.JWT_SECRET_KEY)
        res.status(200).json({existingAdmin,token})
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    let admin;
    try {
        admin = new Admin({ email, password: hashedPassword });
        admin = await admin.save();
    } catch (err) {
        console.error(err);
        // return res.status(500).json("Unable to store admin.");
    }

    if (!admin) {
        return res.status(500).json("Unable to store admin.");
    }

    // res.status(200).json({ admin });
};


exports.adminLogin = async (req, res, next) => {
    const { email, password } = req.body;

    // Validation check for email and password
    if (!email || email.trim() === "" || !password || password.trim() === "") {
        return res.status(406).json("Invalid inputs");
    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
    } catch (err) {
        console.error(err);
        return res.status(500).json("Internal Server Error");
    }

    if (!existingAdmin) {
        return res.status(400).json("Admin not found");
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if (!isPasswordCorrect) {
        return res.status(400).json("Incorrect password");
    }
    const token=jwt.sign({id:existingAdmin._id},process.env.JWT_SECRET_KEY)


    res.status(200).json({message:"Authentication complete",token,id:existingAdmin._id});
};