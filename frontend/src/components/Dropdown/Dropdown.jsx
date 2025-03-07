import { forwardRef, useState } from "react";
import { useGetDropdownOptionsQuery } from "../../services/course.api";
import { ImSpinner2 } from "react-icons/im";

const Dropdown = forwardRef(({ endpoint, label, required,showLabel=true , placeholder = "Select an option", className = "", ...rest }, ref) => {
  const [fetchData, setFetchData] = useState(false);
  const { data: options, error, isLoading } = useGetDropdownOptionsQuery(endpoint, { skip: !fetchData });

  const handleClick = () => {
    if (!fetchData) setFetchData(true); // Trigger API call only on first click
  };

  return (
    <div className="relative">
      {showLabel && <label className="block mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>}
      <select
        className={`block p-2 border bg-white border-gray-300 rounded-md focus:outline-none ${className}`}
        onClick={handleClick} // Trigger API call
        ref={ref} // Accept ref for react-hook-form
        {...rest}
      >
        <option value="">{placeholder}</option>
        {isLoading ? (
          <option className="text-center">
              Loading...
          </option>
        ) : error ? (
          <option disabled>Error fetching options</option>
        ) : (
          options?.data?.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))
        )}
      </select>
    </div>
  );
});

export default Dropdown;
