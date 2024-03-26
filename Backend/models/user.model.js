import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  fullname:{
    type:String,
    require:true
  },
  username:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String,
    require:true,
    minLength: 6
  },
  gender:{
    type:String,
    require:true,
    enum : ["male","female"]
  },
  profilePic:{
    type: String,
    require:true
  }
})

const User = mongoose.model("User",userSchema);

export default User;