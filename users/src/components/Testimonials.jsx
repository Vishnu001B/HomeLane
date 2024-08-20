import React from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    photo: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "John Doe",
    date: "July 30, 2024",
    rating: 4,
    description: "This is an amazing product! Highly recommended.",
  },
  {
    photo: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFufGVufDB8fDB8fHww",
    name: "Smith K.",
    date: "June 20, 2024",
    rating: 5,
    description: "Excellent service and quality. Will buy again.",
  },
  {
    photo: "https://media.istockphoto.com/id/917034024/photo/young-tourist-woman-with-paris-city-map-against-tour-eiffel.jpg?s=2048x2048&w=is&k=20&c=PIGbThVg5mX9cdLdKsM6mEDaOopAnsAkwWSN06AqEfw=",
    name: "Paper Public",
    date: "June 20, 2024",
    rating: 3,
    description: "Excellent service and quality. Will buy again.",
  },
  {
    photo: "https://media.istockphoto.com/id/1247021049/photo/beautiful-happy-late-teen-girl-wearing-sunglasses-striped-dress-and-enjoying-fresh-air.jpg?s=2048x2048&w=is&k=20&c=Bwo1fJ5uQWvgxndiNeQcFx_4CMUtJxzJvoU3hfjniG8=",
    name: "Jany Choppra",
    date: "June 20, 2024",
    rating: 5,
    description: "Excellent service and quality. Will buy again.",
  },
  {
    photo: "https://cdn.pixabay.com/photo/2022/04/30/14/04/woman-7165664_1280.jpg",
    name: "Jane Smith",
    date: "June 20, 2024",
    rating: 5,
    description: "Excellent service and quality. Will buy again.",
  },
  {
    photo: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg",
    name: "Jane Smith",
    date: "June 20, 2024",
    rating: 5,
    description: "Excellent service and quality. Will buy again.",
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show three cards per page on large screens
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, // For medium screens (tablets)
        settings: {
          slidesToShow: 2, // Show two cards per page on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600, // For small screens (phones)
        settings: {
          slidesToShow: 1, // Show one card per page on small screens
          slidesToScroll: 1, // Ensure it scrolls one card at a time
        },
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 w-full max-w-full my-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Testimonials</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="px-4">
            <TestimonialCard
              photo={testimonial.photo}
              name={testimonial.name}
              date={testimonial.date}
              rating={testimonial.rating}
              description={testimonial.description}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;