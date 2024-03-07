import React from "react";

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="cursor-pointer bg-gray-300 rounded-lg p-6 m-8 overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-110">
      <div className="w-48 h-48">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="mt-4">
        <h2 className="mb-2 text-black">{name}</h2>
        <h3 className="text-gray-700">${price.toLocaleString()}</h3>
      </div>
    </div>
  );

};

export default ProductCard;
