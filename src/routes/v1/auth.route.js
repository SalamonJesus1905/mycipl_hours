import express from "express";
import schemaValidate from "../../middleware/Schema.validate.js";
import verifyToken from "../../middleware/validate.js";
import authValidation from "../../validations/auth.validation.js";
import authController from "../../controllers/index.js";
const router = express.Router() 

router.post('/register',schemaValidate(authValidation.register),authController.register)

router.post('/login',schemaValidate(authValidation.login),authController.login)

router.get('/index',verifyToken,async (req,res) => {
    res.send("welcome to the index page")
})

router.get('/logout',async (req,res) => {

    res.send("welcome to the index page")
})

export default router;