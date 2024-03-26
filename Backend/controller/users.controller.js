import User from "../models/user.model.js";

async function getUserForSidebar(req,res){
  try {
    const loggedInUser = req._id;

    const filteredUsers = await User.find({_id :{$ne: loggedInUser}})
    res.status(200).json(filteredUsers);

  } catch (error) {
    console.log("Error in getuser controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
}

export default getUserForSidebar;