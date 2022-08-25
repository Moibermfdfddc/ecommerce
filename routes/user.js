const express = require("express")
const userControl = require("../controllers/userController")
const router = express.Router()

router.use(userControl.checkLoggedIn)

router.get("/home", userControl.checkAccountVerified, (req, res) => {
    res.render("user/home", {
        layout: "layouts/layouts",
        extractScripts: true
    })
})

router.get("/changePassword", userControl.checkAccountVerified, (req, res) => {
    const errorMessage = req.flash("message")
    res.render("user/changePassword", {
        errorMessage: errorMessage,
        layout: "layouts/layouts",
        extractScripts: true

    })
})

router.put("/changePassword", userControl.changePassword)


module.exports = router