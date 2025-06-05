const express = require('express');
const { 
  createProduct, 
  getProducts, 
  deleteProduct,
  getCategories
} = require('../controllers/productController');

const router = express.Router();

router.route('/').post(createProduct).get(getProducts);
router.route('/:id').delete(deleteProduct);
router.route('/categories').get(getCategories);

module.exports = router;
