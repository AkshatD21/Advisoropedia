import React from "react";

const ProductList = ({ product }) => {
  return (
    <div className="flex flex-wrap items-center justify-evenly">
      <div className="cursor-pointer bg-gray-300 rounded-lg p-6 m-8 overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-110">
        <div className="w-48 h-48">
          <img className="w-full h-full object-cover" src={product.image} />
        </div>
        <div className="mt-4">
          <h2 className="mb-2 text-black">{product.name}</h2>
          <p className="text-gray-700">
            ${product.current_price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
