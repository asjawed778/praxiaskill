import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../store/reducers/adminCategoryReducer";
import { useGetAllCategoryQuery } from "../../../services/course.api";
import Button from "../../../components/Button/Button";

const ViewCategories = () => {
  const { data: allCategories, isLoading, error } = useGetAllCategoryQuery();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (allCategories?.success) {
      dispatch(setCategories(allCategories?.data || []));
    }
  }, [allCategories]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 ">
        Available Categories
      </h2>
      {isLoading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-600 text-center">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={category._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-5 flex flex-col gap-3 h-full">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="text-gray-600 flex-grow">{category.description}</p>

                <Button type="button" >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCategories;
