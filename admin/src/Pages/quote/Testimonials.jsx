import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import EditModal from "./EditModal";
import CreateTestimonialModal from "./CreateTestimonialModal"; // Import the new modal
import { Button } from "react-bootstrap";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); // Modal for creating testimonials
  const URI = import.meta.env.VITE_API_URL;

  // Fetch testimonials from the API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${URI}api/quotes/new-quotes`);
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials", error);
      }
    };
    fetchTestimonials();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URI}api/quotes/new-quotes/${id}`);
      setTestimonials(
        testimonials.filter((testimonial) => testimonial._id !== id)
      );
    } catch (error) {
      console.error("Error deleting testimonial", error);
    }
  };

  // Open Modal for Editing
  const handleEdit = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTestimonial(null);
  };

  // Handle Update (PUT)
  const handleUpdate = async (updatedTestimonial) => {
    try {
      await axios.put(
        `${URI}api/quotes/new-quotes/${updatedTestimonial._id}`,
        updatedTestimonial
      );
      setTestimonials(
        testimonials.map((testimonial) =>
          testimonial._id === updatedTestimonial._id
            ? updatedTestimonial
            : testimonial
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating testimonial", error);
    }
  };

  // Open the Create Testimonial Modal
  const handleCreateTestimonial = () => {
    setShowCreateModal(true);
  };

  // Handle successful creation of a testimonial
  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    // Refresh testimonials after creation
    axios.get(`${URI}api/quotes/new-quotes`).then((response) => {
      setTestimonials(response.data);
    });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 w-full max-w-full my-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Testimonials</h2>
        <Button
          onClick={handleCreateTestimonial}
          className="bg-blue-500 text-white"
        >
          Create Testimonial
        </Button>
      </div>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="relative px-4">
            <TestimonialCard
              photo={`${URI}${testimonial.authorImage}`}
              name={testimonial.author}
              date={new Date(testimonial.date).toLocaleDateString()}
              rating={testimonial.rating}
              description={testimonial.quote}
            />
            <div className="absolute top-0 right-0 flex space-x-2 p-2">
              <AiFillEdit
                className="cursor-pointer text-blue-500"
                onClick={() => handleEdit(testimonial)}
              />
              <AiFillDelete
                className="cursor-pointer text-red-500"
                onClick={() => handleDelete(testimonial._id)}
              />
            </div>
          </div>
        ))}
      </Slider>

      {showModal && selectedTestimonial && (
        <EditModal
          testimonial={selectedTestimonial}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}

      {/* Create Testimonial Modal */}
      {showCreateModal && (
        <CreateTestimonialModal
          show={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateSuccess}
        />
      )}
    </div>
  );
};

export default Testimonials;
