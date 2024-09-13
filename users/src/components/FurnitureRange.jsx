import React from "react";

const FurnitureRange = () => {
  const categories = [
    { name: "Sofas", icon: "🛋️" },
    { name: "Beds", icon: "🛏️" },
    { name: "Dining", icon: "🍽️" },
    { name: "Wardrobes", icon: "🚪" },
    { name: "Recliners", icon: "💺" },
    { name: "Seating", icon: "🪑" },
    { name: "Coffee Tables", icon: "☕" },
    { name: "TV Units", icon: "📺" },
    { name: "Shoe Racks", icon: "👞" },
    { name: "Study", icon: "📚", highlight: true }, // Highlighted item
    { name: "Bookshelves", icon: "📖" },
    { name: "Lighting", icon: "💡" },
  ];

  return (
    <div className="container mx-auto py-10 ">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Explore Our Furniture Range
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
        {categories.map((category) => (
          <div
            key={category.name}
            className={`flex flex-col items-center ${
              category.highlight ? "text-orange-600" : "text-gray-600"
            }`}
          >
            {/* Icon placeholder, replace with actual SVGs or icons */}
            <div className="text-6xl mb-4">{category.icon}</div>
            <span className="text-md font-medium">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureRange;
