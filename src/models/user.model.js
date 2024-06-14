import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
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
    role:{
            type: String,
            enum : ['ADMIN','USER'],
            default: 'USER',
            required : true,
    },
    password : {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
          if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            throw new Error('Password must contain at least one letter and one number');
          }
        },
    },
    token : {
        type: String,
        default: null
    }
},{
    timestamps:true
})

userSchema.pre('save', async function(next){
    let user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }
})

const User = mongoose.model('User', userSchema)

export default User;    