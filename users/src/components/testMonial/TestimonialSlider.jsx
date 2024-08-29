import React, { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    img: 'https://cruip-tutorials.vercel.app/fancy-testimonials-slider/testimonial-01.jpg',
    quote: "The ability to capture responses is a game-changer. If a user gets tired of the sign-up and leaves, that data is still persisted. Additionally, it's great to select between formats.",
    name: 'Jessie J',
    role: 'Acme LTD'
  },
  {
    img: 'https://cruip-tutorials.vercel.app/fancy-testimonials-slider/testimonial-02.jpg',
    quote: "Having the power to capture user feedback is revolutionary. Even if a participant abandons the sign-up process midway, their valuable input remains intact.",
    name: 'Nick V',
    role: 'Malika Inc.'
  },
  {
    img: 'https://cruip-tutorials.vercel.app/fancy-testimonials-slider/testimonial-03.jpg',
    quote: "The functionality to capture responses is a true game-changer. Even if a user becomes fatigued during sign-up and abandons the process, their information remains stored.",
    name: 'Amelia W',
    role: 'Panda AI'
  },
];

const TestimonialSlider = () => {
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const autorotateTiming = 7000;
  const testimonialsRef = useRef(null);

  useEffect(() => {
    let autorotateInterval;
    if (autorotate) {
      autorotateInterval = setInterval(() => {
        setActive((prevActive) => (prevActive + 1) % testimonials.length);
      }, autorotateTiming);
    }

    return () => {
      clearInterval(autorotateInterval);
    };
  }, [autorotate, autorotateTiming]);

  useEffect(() => {
    const heightFix = () => {
      if (testimonialsRef.current) {
        const currentChild = testimonialsRef.current.children[active + 1];
        if (currentChild) {
          testimonialsRef.current.style.height = `${currentChild.offsetHeight}px`;
        }
      }
    };

    heightFix();
  }, [active]);

  return (
    <div className="w-full max-w-3xl mx-auto text-center my-60">
      {/* Testimonial image */}
      <div className="relative h-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-indigo-500/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
          <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 -z-10 transition duration-700 ease-[cubic-bezier(0.68,-0.3,0.32,1)] ${
                  active === index ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-[60deg]'
                }`}
              >
                <img
                  className="relative top-11 left-1/2 -translate-x-1/2 rounded-full"
                  src={testimonial.img}
                  width="56"
                  height="56"
                  alt={testimonial.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="mb-9" ref={testimonialsRef}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`relative flex flex-col transition-all duration-150 delay-300 ease-in-out ${
              active === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute'
            }`}
          >
            <div className="text-2xl font-bold text-slate-900 before:content-['\201C'] after:content-['\201D']">
              {testimonial.quote}
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center -m-1.5">
        {testimonials.map((testimonial, index) => (
          <button
            key={index}
            className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ${
              active === index ? 'bg-indigo-500 text-white shadow-indigo-950/10' : 'bg-white hover:bg-indigo-100 text-slate-900'
            }`}
            onClick={() => {
              setActive(index);
              setAutorotate(false);
            }}
          >
            <span>{testimonial.name}</span>
            <span className={active === index ? 'text-indigo-200' : 'text-slate-300'}> - </span>
            <span>{testimonial.role}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
