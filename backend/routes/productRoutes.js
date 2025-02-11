const express = require("express");
const pool = require("../db");
const router = express.Router();

const {getProducts, createProduct, updateProduct} = require("../controllers/productsController");


router.get("/", getProducts)
router.post("/", createProduct)
router.put("/:product_id", updateProduct)



module.exports = router;