import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UpdateCategoryModal = ({ isOpen, onClose, onSave, category }) => {
  const [formData, setFormData] = useState({
    category: "",
    images: null, // For file upload
  });

  // Effect to initialize form data when category prop changes
  useEffect(() => {
    if (category) {
      setFormData({
        category: typeof category.category === "string" ? category.category : "",
        images: category.images || null,
      });
    }
  }, [category]);

  // Effect to clean up object URL when formData.images changes
  useEffect(() => {
    return () => {
      if (formData.images && formData.images instanceof File) {
        URL.revokeObjectURL(formData.images.previewUrl);
      }
    };
  }, [formData.images]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images" && files[0]) {
      const file = files[0];
      // Set a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        [name]: file,
        previewUrl: previewUrl, // Store preview URL for image display
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    data.append("category", formData.category);
    if (formData.images) {
      data.append("files", formData.images);
    }
    onSave(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Modify the category details and save the changes.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Category Name</Label>
            <Input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category name"
            />
          </div>
          <div>
            <Label htmlFor="images">Upload Image</Label>
            <Input
              type="file"
              name="images"
              id="images"
              onChange={handleChange}
              accept="image/*"
            />
          </div>
          {formData.previewUrl && (
            <div className="mt-4">
              <img
                src={formData.previewUrl}
                alt="Selected category"
                className="h-40 w-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategoryModal;
