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

// Add health check route
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

module.exports = router;
