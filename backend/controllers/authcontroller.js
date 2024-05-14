import User from "../models/usermodel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req,res) => {
try {
const {fullName,userName,password,confirmPassword,gender}= req.body;  // Middelewares

if (password !== confirmPassword) {
    return res.status(400).json({error:"Password doesn't match"})
}

const user = await User.findOne({userName});

if (user) {
    return res.status(400).json({error:"User already exists"})
}
// HASH Password Here
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt);

// Generate Profile Pic
// https://avatar-placeholder.iran.liara.run/

const boyProfilePic = `https://avatar.iran.liara.run/public/boy?userName=${userName}`
const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userName=${userName}`

const newUser = new User({
    fullName,
    userName,
    password: hashedPassword,
    gender,
    profilePic : gender === "male" ? boyProfilePic : girlProfilePic
})
if (newUser) {
    //Generate JWT Token here
generateTokenAndSetCookie(newUser._id, res);
await newUser.save();

res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    userName: newUser.userName,
    profilePic: newUser.profilePic,
});
} else{
    res.status(400).json({ error: "Invalid user data"});
}

}catch (error) {
    console.log("Error in Signup Controller", error.message);
    res.status(500).json({error:"Internal Server Error"});
}
};

export const login = async (req, res) => {
try {
    const {userName, password} = req.body;
    const user = await User.findOne({userName});
    const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPasswordCorrect){
        return res.status(400).json({error:"Invalid userName or password"});
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePic: user.profilePic,
    });

} catch (error) {
    console.log("Error in Login Controller", error.message);
    res.status(500).json({error:"Internal Server Error"});
}
};

export const logout =  (req, res) => {
    try {
        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message:"User Logged Out Successfully"});
        
    } catch (error) {
        console.log("Error in Logout Controller", error.message);
        res.status(500).json({error:"Internal Server Error"});
    }
};

