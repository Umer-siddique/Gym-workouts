const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')

const Schema=mongoose.Schema

const userSchema=new Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// static signup method
 userSchema.statics.signup=async function(email,password){
      
      if(!email || !password){
        throw Error("All field must be filled")
      }
      if(!validator.isEmail(email)){
        throw Error("Please enter a valid email")
      }
      if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough")
      }
      const exist=await this.findOne({email})

      if(exist){
        throw Error("Email is already in use by another account")
      }

      const salt=await bcrypt.genSalt(10)
      const hash=await bcrypt.hash(password,salt)
      const user=await this.create({email,password:hash})

      return user

 }

//  static login method
userSchema.statics.login=async function(email,password){
  if(!email || !password){
    throw Error("All fields must be filled")
  }
  const existUser=await this.findOne({email})
  if(!existUser){
    throw Error("There is no user corresponding to this email")
  }
  const match=await bcrypt.compare(password,existUser.password)
  if(!match){
    throw Error("Incorrect Password!")
  }
  
  return existUser
}

module.exports=mongoose.model("User",userSchema)