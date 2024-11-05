
import React, { useEffect, useState } from "react";
import DataCategories from "../DataCategories/DataCategories";
import Products from "../Products/Products";

const AllData = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const uniqueCategories = [
    ...new Set(items.map((product) => product.category)),
  ];

  //   filter categories
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Filtered items based on selected category
  const filteredItems = items.filter((product) =>
    selectedCategory === "All" ? true : product.category === selectedCategory
  );

  return (
    <div>
      <h3 className="text-4xl font-bold mb-10 text-center">
        Explore Cutting-Edge Gadgets
      </h3>
      <div className="flex gap-3">
        <div className="w-[20%] flex flex-col gap-y-4 bg-white justify-center items-center p-5 h-max rounded-xl">
          <button
            onClick={() => handleCategoryChange("All")}
            className="w-[150px] p-3 border-2 rounded-3xl"
          >
            All Products
          </button>
          {uniqueCategories.map((category, idx) => (
            <DataCategories
              key={idx}
              handleCategoryChange={handleCategoryChange}
              productCategory={category}
            />
          ))}
          <button
            onClick={() => handleCategoryChange("Accessories")}
            className="w-[150px] p-3 border-2 rounded-3xl"
          >
            Accessories
          </button>
        </div>


        <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredItems.length > 0 ? (
            filteredItems.slice(0, 9).map((product) => (
              <Products key={product.product_id} product={product} />
            ))
          ) : (
            <p className="col-span-3 text-center text-4xl font-bold text-gray-500">
              No data found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllData;