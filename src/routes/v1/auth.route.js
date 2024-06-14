import express from "express";
import schemaValidate from "../../middleware/Schema.validate.js";
import verifyToken from "../../middleware/validate.js";
import authValidation from "../../middleware/auth.validation.js";
import authController from "../../controllers/index.js";
import role from "../../middleware/role.validation.js";
const router = express.Router()

router.post('/register', schemaValidate(authValidation.register), authController.register)
router.post('/login', schemaValidate(authValidation.login), authController.login)
router.get('/userindex', role.roleUser, async (req, res) => {
    res.send("welcome to the User index page")
})
router.get('/Adminindex', role.roleAdmin, async (req, res) => {
    res.send("welcome to the ADMIN index page")
})
router.post('/forgetPassword', schemaValidate(authValidation.forget), authController.forget)
router.get('/resetPassword/:token', authController.resetPassword)
router.post('/resetPassword/reset', schemaValidate(authValidation.reset), authController.updatePassword)

export default router;

// router.get('/index',verifyToken,async (req,res) => {
//     res.send("welcome to the ADMIN index page")
// })

// router.get('/logout',async (req,res) => {

//     res.send("welcome to the index page")
// })