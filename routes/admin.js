const express = require("express")
const router = express.Router()
const userControl = require("../controllers/userController")
const multer = require("../middleware/multer")
const authentication = require("../middleware/authentication")
const productControl = require("../controllers/productController")
const adminControl = require("../controllers/adminController")
const orderControl = require("../controllers/orderController")
const bannerControl = require("../controllers/bannerController")
const couponControl = require("../controllers/couponController")

// router.use(authentication.checkLoggedIn, authentication.checkAdminPrivilege)

router.get("/", adminControl.home)
router.get("/categories", adminControl.categories)
router.get("/products", adminControl.products)
router.get("/orders", adminControl.orders)
router.get("/coupons", adminControl.coupons)
router.get("/banners", bannerControl.getBanner)


router.post("/addCategory", adminControl.addCategory)
router.post("/addProduct", multer.send, productControl.addProduct)
router.post("/addCoupon", couponControl.addCoupon)

router.put("/activateCoupon/:id", couponControl.activate)
router.put("/deactivateCoupon/:id", couponControl.deactivate)
router.put("/editProduct/:id", multer.send, productControl.editProduct)
router.put("/editCategory/:id", adminControl.editCategory)
router.put("/blockUser/:id", adminControl.blockUser)
router.put("/unblockUser/:id", adminControl.unblockUser)

router.put("/packOrder/:id", orderControl.packOrder)
router.put("/shipOrder/:id", orderControl.shipOrder)
router.put("/outForDelivery/:id", orderControl.outForDelivery)
router.put("/deliverPackage/:id", orderControl.deliverPackage)
router.put("/cancelOrder/:id", orderControl.cancelOrder)

router.delete("/deleteProduct/:id", productControl.deleteProduct)
router.delete("/deleteCategory/:id", adminControl.deleteCategory)
router.delete("/logout", userControl.userLogout)

module.exports = router