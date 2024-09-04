const Category = require('../models/category');

// POST: Create a new category with images
exports.createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const images = req.files.map(file => file.path);

    const Newcategory =  category.toLowerCase();

    const newCategory = new Category({ category:Newcategory, images });
    await newCategory.save();

    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

// GET: Retrieve all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error });
  }
};

// GET: Retrieve a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving category', error });
  }
};

// PUT: Update a category by ID
exports.updateCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const Newcategory = category.toLowerCase();

    // Check if new images were provided
    let updatedData = { category: Newcategory };
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => file.path);
      updatedData.images = images;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};


// DELETE: Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
