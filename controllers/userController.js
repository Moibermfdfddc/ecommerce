const User = require("../models/users")
const passport = require("passport")
const { sendOtp } = require("../middleware/otp")

module.exports = {
    userRegister: (req, res) => {
        if (req.body.password === req.body.confirmedPassword) {
            User.register({
                name: req.body.name,
                email: req.body.email,
            }, req.body.password, async function (err, user) {
                if (err) {
                    console.log(err)
                    req.flash("message", "User Already registered")
                    res.redirect("/register")
                }
                else {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/user/home")
                    })

                }
            })
        }
        else {
            req.flash("message", "password doesn't match")
            res.redirect("/register")
        }
    },

    checkAccountVerified: async function (req, res, next) {
        if (req.user.isVerified) {
            next()
        }
        else {
            sendOtp(req, res)
        }
    },

    userLogin: passport.authenticate('local', {
        failureFlash: true,
        failureRedirect: '/login',
    }),

    userLogout: (req, res) => {
        req.logout(function (err) {
            if (err) {
                console.log(err)
            } else {
                // req.flash("logoutMessage", "you have successfully logout")
                res.redirect('/')
            }
        })
    },

    changePassword: (req, res) => {
        const oldPassword = req.body.oldPassword
        const newPassword = req.body.password
        const confirmedPassword = req.body.confirmedPassword
        const user = req.user
        if (newPassword === confirmedPassword) {
            user.changePassword(oldPassword, newPassword, function (err) {
                if (err) {
                    console.log(err)
                    req.flash("message", "wrong credentials")
                    res.redirect("changePassword")
                }
                else {
                    res.redirect("/user/home")
                }
            })
        }
        else {
            req.flash("message", "password doesn't match")
            res.redirect("changePassword")
        }
    },

    checkLoggedOut: (req, res, next) => {
        if (req.isAuthenticated() && req.user.isAdmin) {
            res.redirect("/admin")
        }
        else if (req.isAuthenticated()) {
            res.redirect("/user/home")
        }
        else {
            next()
        }
    },

    checkLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            next()
        }
        else {
            req.flash("message", "Pls login to access home")
            res.redirect("/")
        }
    }

}
