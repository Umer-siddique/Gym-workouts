const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const User = require("../models/userModel")

// Create json Web Token
const createToken=(_id)=>{
      return jwt.sign({_id},process.env.SECRET,{expiresIn:"3d"})
}

// login users
const loginUsers = async (req, res) => {

    const {email,password}=req.body
    try {
        const user=await User.login(email,password)
        const token=createToken(user._id)

        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// signup users
const signupUsers = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password)
        const token=createToken(user._id)
        
        res.status(200).json({ email, token })
        
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}

module.exports = { loginUsers, signupUsers }