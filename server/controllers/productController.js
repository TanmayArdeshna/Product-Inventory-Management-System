const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

// @desc    Create a new product
// @route   POST /api/products
// @access  Public
const createProduct = async (req, res) => {
  try {
    const { name, description, quantity, categories } = req.body;

    // Server-side validation
    if (!name || !description || quantity === undefined || !categories || categories.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Normalize product name by trimming spaces and converting to lowercase
    const normalizedName = name.trim().toLowerCase().replace(/\s+/g, ' ');
    
    // Check if product name already exists (case insensitive and ignoring extra spaces)
    const existingProduct = await Product.findOne({ 
      name: { $regex: new RegExp(`^${normalizedName}$`, 'i') } 
    });
    
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this name already exists'
      });
    }

    // Validate categories
    for (const categoryId of categories) {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({
          success: false,
          message: `Invalid category ID: ${categoryId}`
        });
      }
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: `Category with ID ${categoryId} not found`
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      quantity,
      categories
    });

    // Populate categories for response
    const populatedProduct = await Product.findById(product._id).populate('categories', 'name');

    res.status(201).json({
      success: true,
      data: populatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all products with pagination, search, and category filter
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = {};
    
    // Search by name
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    
    // Filter by categories
    let categoryIds = [];
    if (req.query.categories) {
      try {
        categoryIds = Array.isArray(req.query.categories) 
          ? req.query.categories 
          : req.query.categories.split(',').filter(id => mongoose.Types.ObjectId.isValid(id));
      } catch (error) {
        // If invalid format, use empty array rather than crashing
        categoryIds = [];
      }
      
      if (categoryIds.length > 0) {
        query.categories = { $in: categoryIds };
      }
    }
    
    // Count total documents for pagination info
    const total = await Product.countDocuments(query);
    
    // Fallback for sorting (performance and scaling)
    const sortField = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
    const sortOptions = {};
    sortOptions[sortField] = sortOrder;
    
    // Get products
    const products = await Product.find(query)
      .populate('categories', 'name')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance with large datasets
    
    res.status(200).json({
      success: true,
      count: products.length,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalProducts: total,
      data: products
    });
  } catch (error) {
    // Add more detailed logging for production troubleshooting
    console.error(`Error fetching products: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products. Please try again later.'
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Public
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID'
      });
    }
    
    // Use findByIdAndDelete with safeguards
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or already deleted'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    // Add more context to the error message
    console.error(`Error deleting product ${req.params.id}: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product. Please try again later.'
    });
  }
};

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check API health
// @route   GET /api/health
// @access  Public
const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is running',
    timestamp: new Date()
  });
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getCategories,
  healthCheck  // Add this to exports
};
