import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const CreateTestimonialModal = ({ show, onClose, onCreate }) => {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(0);
  const [quote, setQuote] = useState("");
  const [image, setImage] = useState(null);
  const URI = import.meta.env.VITE_API_URL;

  // Handle image upload
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", author);
    formData.append("rating", rating);
    formData.append("quote", quote);
    formData.append("file", image);

    try {
      await axios.post(`${URI}api/quotes/new-quotes`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onCreate(); // Reload testimonials after successful submission
      onClose(); // Close modal
    } catch (error) {
      console.error("Error creating testimonial", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New Testimonial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formAuthor" className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="p-2"
            />
          </Form.Group>

          <Form.Group controlId="formRating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min={1}
              max={5}
              className="p-2"
            />
          </Form.Group>

          <Form.Group controlId="formQuote" className="mb-3">
            <Form.Label>Testimonial Quote</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter testimonial quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              required
              className="p-2"
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              required
              className="p-2"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-full p-2">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateTestimonialModal;
