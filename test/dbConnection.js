import mongoose from "mongoose";
import config from "../src/config/config.js";

const superDB = () =>{
    mongoose.connect('mongodb://localhost:27017/checking')
}

export default superDB;