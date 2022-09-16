const {loginUsers,signupUsers}=require('../controllers/userController')
const express=require('express')
const router=express.Router()

// LOGIN USERS
router.post("/login",loginUsers)

// SIGNUP USERS
router.post("/signup",signupUsers)

module.exports=router