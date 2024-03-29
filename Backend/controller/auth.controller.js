import User from "../models/user.model.js";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import genrateTokenAndSetCookies from "../utils/genrateToken.js";

export async function signup(req, res) {
  try {
    const { fullname, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ err: "Password did't match" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ err: "This user already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
			// Generate JWT token here
			genrateTokenAndSetCookies(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullname,
				username: newUser.username,
				profilePic: newUser.profilePic,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
   } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const check = await bcrypt.compare(password, user?.password || "");
    if (!user || !check) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    genrateTokenAndSetCookies(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
}

export async function logout(req, res) {
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message : "Logout sucessfully"});
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
}
