const User = require("../models/users")
const Category = require("../models/category")
const Product = require("../models/product")

module.exports = {

    home: (req, res) => {
        res.render("admin/dashboard", {
            layout: "layouts/layouts",
            extractScripts: true
        })
    },

    user: async (req, res) => {
        try {
            const errorMessage = req.flash("message")
            const users = await User.find({}).sort({ createdAt: -1 }).exec()
            res.render("admin/userManagement", {
                users: users,
                errorMessage: errorMessage,
                layout: "layouts/layouts",
                extractScripts: true
            })
        } catch (err) {
            console.log(err.message)
            res.redirect("/")

        }
    },

    categories: async (req, res) => {
        try {
            const errorMessage = req.flash("message")
            const allCategories = await Category.find().sort({ categoryName: 1 }).exec()
            res.render("admin/categoryManagement", {
                allCategories: allCategories,
                errorMessage: errorMessage,
                layout: "layouts/layouts",
                extractScripts: true
            })
        } catch (err) {
            console.log(err.message)
        }
    },

    products: async (req, res) => {
        try {
            const allCategories = await Category.find().sort({ categoryName: 1 }).exec()
            const allProducts = await Product.find().populate("category").exec()
            const errorMessage = req.flash("message")
            res.render("admin/productManagement", {
                allProducts: allProducts,
                allCategories: allCategories,
                layout: "layouts/layouts",
                errorMessage: errorMessage,
                extractScripts: true
            })

        } catch (err) {
            console.log(err.message)
        }
    },

    addCategory: async (req, res) => {
        try {
            const category = new Category({
                categoryName: req.body.categoryName
            })
            await category.save()
            res.redirect("/admin/categories")

        } catch (err) {
            console.log(err.message)
            req.flash("message", "category already exists")
            res.redirect("/admin/categories")

        }
    },

    editCategory: async (req, res) => {
        try {
            await Category.findByIdAndUpdate(
                req.params.id,
                { categoryName: req.body.categoryName })
            res.redirect("/admin/categories")
        }
        catch (err) {
            console.log(err.message)
            req.flash("message", "Error editing in category")
            res.redirect("/admin/categories")
        }
    },

    deleteCategory: async (req, res) => {
        let category
        try {
            category = await Category.findById(req.params.id)
            await category.remove()
            res.redirect("/admin/categories")
        } catch (err) {
            console.log(err.message)
            if (category == null) {
                res.redirect("/admin")
            } else {
                req.flash("message", err.message)
                res.redirect("/admin/categories")
            }

        }
    },

    blockUser: async (req, res) => {
        try {
            await User.findByIdAndUpdate(
                req.params.id,
                { isActive: false })
            res.redirect("/admin/users")
        } catch (err) {
            console.log(err.message)
            req.flash("message", "Error blocking User")
            res.redirect("/admin/users")
        }
    },

    unblockUser: async (req, res) => {
        try {
            await User.findByIdAndUpdate(req.params.id, { isActive: true })
            res.redirect("/admin/users")
        } catch (error) {
            console.log(err.message)
            req.flash("message", "Error un blocking User")
            res.redirect("/admin/users")
        }
    }

}





