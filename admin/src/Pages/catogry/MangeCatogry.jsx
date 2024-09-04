import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import AddCategoryModal from "./AddCategoryModal"; // Adjust the path as needed
import UpdateCategoryModal from "./UpdateCategoryModal"; // New Update Modal Component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import the Alert components

// Card Component
const Card = ({ img, title, onDelete, onUpdate }) => {
  return (
    <div className="relative w-full md:w-72 lg:w-72 xl:w-80 rounded-lg overflow-hidden card group">
      <div className="h-60 overflow-hidden relative">
        <img
          src={img}
          alt={title}
          className="w-full h-full rounded-lg object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-4">
          <Button className="bg-red-600" onClick={onDelete}>
            Delete
          </Button>
          <Button className="bg-yellow-600" onClick={onUpdate}>
            Update
          </Button>
        </div>
      </div>
      <h3 className="p-4 text-lg font-semibold text-white text-center">
        {title}
      </h3>
    </div>
  );
};

// MangeCatogry Component
const MangeCatogry = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // New state for update modal
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); // For update
  const [alert, setAlert] = useState(null); // For alert

  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await axios.get(`${URI}api/categories/`);
      console.log("productsByCategory", resp.data);
      setCategoriesData(resp.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSaveCategory = async (formData) => {
    try {
      const resp = selectedCategory
        ? await axios.put(
            `${URI}api/categories/${selectedCategory._id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
        : await axios.post(`${URI}api/categories/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

      console.log("Category saved:", resp.data);
      window.location.reload();

      if (selectedCategory) {
        setCategoriesData(
          categoriesData.map((cat) =>
            cat._id === selectedCategory._id ? resp.data : cat
          )
        );
        setAlert({
          type: "success",
          message: "Category updated successfully!",
        });
      } else {
        setCategoriesData([...categoriesData, resp.data]); // Add new category
        setAlert({
          type: "success",
          message: "Category added successfully!",
        });
      }

      setSelectedCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
      setAlert({
        type: "error",
        message: "Failed to save category.",
      });
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`${URI}api/categories/${categoryId}`);
      setCategoriesData(categoriesData.filter((cat) => cat._id !== categoryId));
      setAlert({
        type: "success",
        message: "Category deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting category:", error);
      setAlert({
        type: "error",
        message: "Failed to delete category.",
      });
    }
  };

  const handleUpdateCategory = (category) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true); // Open the update modal
  };

  const filteredCategories = categoriesData.filter((category) =>
    category.category?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="lg:py-5 py-4 px-4 font-sans text-white">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 w-full">
        <div className="w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Search Category"
            className="px-4 py-2 border text-black rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full lg:w-1/2 flex justify-end">
          <Button
            className="my-4"
            onClick={() => {
              setSelectedCategory(null);
              setIsModalOpen(true);
            }}
          >
            ADD Category
          </Button>
        </div>
      </div>

      {/* Display alert message */}
      {alert && (
        <Alert
          variant={alert.type === "success" ? "success" : "destructive"}
          className="my-4"
        >
          <AlertTitle>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-wrap items-center justify-center lg:gap-6 xl:px-2 px-5">
        {filteredCategories.map((data, index) => (
          <div key={index} className="flex flex-col items-center mb-6">
            <Card
              img={`${URI}${data.images?.[0] || "placeholder-image.jpg"}`} // Use a placeholder image if none are provided.
              title={data.category}
              onDelete={() => handleDeleteCategory(data._id)}
              onUpdate={() => handleUpdateCategory(data)}
            />
          </div>
        ))}
      </div>

      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory} // Pass selected category for updating
      />
      <UpdateCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSave={handleSaveCategory}
        category={selectedCategory} // Pass selected category for updating
      />
    </div>
  );
};

export default MangeCatogry;
