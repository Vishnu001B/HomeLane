import React from 'react';
import { useSelector } from 'react-redux';
import CustomizedSteppers from './CustomizedSteppers';
import { useLocation } from 'react-router-dom';

const CheckoutForm = () => {
  const { totalQuantity, data } = useSelector((store) => store.bag) || { totalQuantity: 0, data: [] };
  const location = useLocation();
  const product = location.state?.product;

  // If `data` is empty, use `product` from `location.state`
  const newData = data.length > 0 ? data : product ? [product] : [];

  // Calculate cart subtotal
  const cartSubtotal = newData.reduce(
    (total, item) => total + (parseFloat(item.price.replace(/,/g, '')) * (item.quantity || 1)), 
    0
  );
  const shippingCost = 0; // Assuming free shipping for this example
  const orderTotal = cartSubtotal + shippingCost;

  return (
    <>
      <div className='mt-20'>
        <CustomizedSteppers />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-8">

        {/* Shipping Details Form */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input type="email" id="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input type="tel" id="phone" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
                <input type="text" id="firstName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
                <input type="text" id="lastName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Street Address *</label>
              <input type="text" id="address" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country *</label>
                <select id="country" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  <option>India</option>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State/Province *</label>
                <select id="state" className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                  <option>Maharashtra</option>
                  <option>Delhi</option>
                  <option>New York</option>
                  <option>California</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City *</label>
                <input type="text" id="city" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Zip/Postal Code *</label>
                <input type="text" id="postalCode" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <button type="submit" className="w-full p-2 bg-red-500 text-white rounded-md mt-4">
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Product Details & Order Summary */}
        <div className="w-full lg:w-1/3">
          {newData.length > 0 && (
            <>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                {newData.map((item, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <img src={item.img} alt={item.name} className="w-20 h-20 rounded-md" />
                    <div className="ml-4">
                      <p className="text-sm">{item.name}</p>
                      <p className="text-sm font-semibold">Rs. {item.price}</p>
                      <p className="text-sm">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold">Summary</h3>
                <div className="flex justify-between mt-2">
                  <p className="text-sm">Cart Subtotal</p>
                  <p className="text-sm">Rs. {cartSubtotal.toLocaleString()}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm">Shipping</p>
                  <p className="text-sm">Free</p>
                </div>
                <div className="flex justify-between mt-2 font-semibold">
                  <p className="text-sm">Order Total</p>
                  <p className="text-sm">Rs. {orderTotal.toLocaleString()}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
