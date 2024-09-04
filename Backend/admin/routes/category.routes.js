const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const upload = require('../../middleware/multerConfig');

// Create a new category
router.post('/', upload.array('files', 10), categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getCategories);

// Get a single category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:id', upload.array('files', 10), categoryController.updateCategory);

// Delete a category by ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
