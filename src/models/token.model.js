import mongoose from "mongoose";
import validator from "validator";

const tokenSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    resetToken : {
        type: String,
        default: null
    }
},{
    timestamps:true
})

const Token = mongoose.model('Token', tokenSchema)

export default Token;    