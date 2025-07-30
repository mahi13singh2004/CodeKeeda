import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    coins:{
        type:Number,
        default:0
    },
    solvedProblems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Problem"
        }
    ],
    streak:{
        type:Number,
        default:0
    },
    lastChallengeDate:{
        type:Date,
    }
})

const User=mongoose.model("User",userSchema)

export default User
