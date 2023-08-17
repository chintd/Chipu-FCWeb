const express = require("express");
const router = express.Router();

const productsController = require("../controllers/product");

router.get("/", productsController.getFetchProducts);

router.post('/admin', productsController.postAddProduct);

router.post("/search", productsController.postSearchTerm);
router.get("/search", productsController.getSearchVideo);
// router.post("/detail/:detailId", productsController.postDetailVideo);
router.get("/detail/:detailId", productsController.getDetail);
module.exports = router;
