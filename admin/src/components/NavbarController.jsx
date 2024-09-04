import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const NavbarController = () => {
  const URI = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    categories: '',
    subcategories: [],
  });
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [subcategoryInput, setSubcategoryInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${URI}api/admin/navheaders`);
      console.log('Fetched categories:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch categories',
      });
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubcategoryChange = (e) => {
    setSubcategoryInput(e.target.value);
  };

  const addSubcategory = () => {
    const trimmedInput = subcategoryInput.trim();
    if (trimmedInput && !formData.subcategories.includes(trimmedInput)) {
      setFormData((prevData) => ({
        ...prevData,
        subcategories: [...prevData.subcategories, trimmedInput],
      }));
      setSubcategoryInput(''); // Clear input field
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        // Update existing category
        await axios.put(`${URI}api/admin/navheaders/${editingCategory._id}`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category updated successfully!',
        });
        setEditingCategory(null);
      } else {
        // Create new category
        await axios.post(`${URI}api/admin/navheaders`, formData);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Category and Subcategory created successfully!',
        });
      }
      fetchCategories(); // Refresh category list
      setFormData({ categories: '', subcategories: [] }); // Reset form
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `Failed to ${editingCategory ? 'update' : 'create'} category: ${error.message}`,
      });
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      categories: category.categories,
      subcategories: category.subcategories || [],
    });
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${URI}api/admin/navheaders/${categoryId}`);
        Swal.fire(
          'Deleted!',
          'Category has been deleted.',
          'success'
        );
        fetchCategories(); // Refresh category list
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to delete category: ${error.message}`,
        });
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="px-5 w-full">
      {/* Button to open modal */}
      <div className="mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
        >
          Add New Navbar
        </button>
      </div>

      {/* Modal for adding/editing category */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="categories"
                  name="categories"
                  value={formData.categories}
                  onChange={handleInputChange}
                  className="text-blue-950 font-serif font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subcategories" className="block text-sm font-medium text-gray-700">
                  Subcategories
                </label>
                <div className="flex mb-2">
                  <input
                    type="text"
                    id="subcategoryInput"
                    value={subcategoryInput}
                    onChange={handleSubcategoryChange}
                    className="text-blue-950 font-serif font-semibold mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addSubcategory}
                    className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc pl-5">
                  {formData.subcategories.map((sub, index) => (
                    <li key={index} className="text-gray-600">
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 text-white rounded-md shadow-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600"
                >
                  {editingCategory ? 'Update Category' : 'Add Navbar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="h-[70%] overflow-x-auto"> {/* Add horizontal scrolling */}
        {loading ? (
          <p>Loading...</p>
        ) : categories.length > 0 ? (
          <div className="min-w-full h-screen ">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategories</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.categories}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <ul>
                        {(category.subcategories || []).map((sub, index) => (
                          <li key={index}>{sub}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default NavbarController;
