import mongoose from "mongoose";
import config from "./config/config.js";
import app from "./app.js";

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    app.listen(config.port, async() => {
       console.log(`Server is running on port ${config.port}`)
    })
});