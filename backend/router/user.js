const express =require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.post("/login", userController.postLoginUser);
router.post("/register", userController.postRegister);
router.get("/login", userController.getLoginUser);

module.exports = router;
