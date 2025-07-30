import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js"

export const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            name,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            message:"User Registered Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } 
    catch (error) {
        console.log("Error in signup auth backend")
        return res.status(500).json({message:"Internal Server Error"})    
    }
}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"User not found"})
        }
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

        generateTokenAndSetCookie(res,user._id)

        return res.status(200).json({
            message:"User Logged In Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } 
    catch (error) {
        console.log("Error in login auth backend")
        return res.status(500).json({message:"Internal Server Error"})    
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"User Logged Out Successfully"})
    } 
    catch (error) {
        console.log("Error in logout auth backend")
        return res.status(500).json({message:"Internal Server Error"})    
    }
}

export const checkAuth=async(req,res)=>{
    try {
        const user=req.user
        if(!user){
            return res.status(401).json({message:"Unauthorized"})
        }
        return res.status(200).json({
            message:"User Authenticated Successfully",
            user:{
                ...user._doc,
                password:undefined
            }
        })
    } 
    catch (error) {
        console.log("Error in checkAuth auth backend")
        return res.status(500).json({message:"Internal Server Error"})    
    }
}
