import React from 'react';

const PremiumCategory = ({ category, onClose }) => {

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">{category.category} Details</h2>
            <img src={category.img} alt={name} className="w-full h-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="mb-2">Original Price: <span className="line-through">{category.price}</span></p>
            <p className="mb-2">Discounted Price: {category.discountedPrice}</p>
            <p className="mb-2">Discount Percentage: {category.discontpersentage}</p>
            <p className="mb-2">Delivery: {category.delivery}</p>
            <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                Close
            </button>
        </div>
    );
};

export default PremiumCategory;
