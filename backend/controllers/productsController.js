const { query } = require('express')
const pool = require('../db')


const getProducts = async(req, res)=>{
  try {
    const results = await pool.query("SELECT * FROM PRODUCT ORDER BY product_id DESC;")

    res.json(results.rows)    
  } catch (error) {
    console.error(error)
  }
}


const createProduct = async(req, res)=>{
  try {
    const {name, price, image_url} = req.body;
    const query = "INSERT INTO PRODUCT (name, price, image) VALUES($1, $2, $3) RETURNING *;"
    const result = await pool.query(query, [name, price, image_url])
    if(result.rowCount === 0){
      return res.status(400).json({ error: "Product insertion failed." });
    }
    res.json(result.rows[0])

  } catch (error) {
    console.error(error)
  }
}

const updateProduct = async(req, res)=>{
  try {
    const {product_id} = req.params
    const {name, price, image_url} = req.body;
    const query = "UPDATE PRODUCT SET name = $1, price = $2, image = $3 WHERE product_id = $4 RETURNING *"
    const result = await pool.query(query, [name, price, image_url, product_id])
    if(result.rowCount === 0){
      return res.status(400).json({ error: "Product update failed." });
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
  }
}

const deleteProduct = async(req, res)=>{
  try {
    const {product_id} = req.params;
    const query = "DELETE FROM PRODUCT WHERE product_id = $1 RETURNING *"
    const result = await pool.query(query, [product_id])
    if(result.rowCount === 0){
      return res.status(400).json({ error: "Product delete failed." });
    }
    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
  }
}


module.exports = {getProducts, createProduct, updateProduct, deleteProduct}