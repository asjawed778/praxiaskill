import { useState } from "react";
import Button from "../../components/Button/Button";
import { FaCheck } from "react-icons/fa";

export default function BookDemoClass() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };
  return (
    <div className="bg-white flex flex-col gap-3 my-5 p-5 h-auto w-[70vw] lg:w-[351.15px] drop-shadow-2xl shadow-xl rounded-xl mx-auto md:mx-0">
      <h1 className="font text-xl text-[var(--color-primary)]">
        Book a Live Class, For Free!
      </h1>

      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] border-gray-300 text-neutral-800 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
      />

      <input
        type="text"
        placeholder="Education"
        className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
      />
      {/* Phone Number */}
      <input
        type="number"
        placeholder="Phone No"
        className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
      />

      {/* Email Id */}
      <input
        type="email"
        placeholder="Email Id"
        className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
      />

      {/* Education */}

      {/* Interested Course */}
      <input
        type="text"
        placeholder="Interested Course"
        className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
      />

      <section className="flex items-center">
        <input
          hidden
          type="checkbox"
          name="Whatsapp"
          id="Whatsapp"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Whatsapp" className="cursor-pointer">
          <div
            className={`w-5 h-5 text-[var(--optional-color)] p-0.5 bg-neutral-100 rounded flex justify-center items-center ${
              isChecked && "border border-blue-400"
            }`}
          >
            {isChecked && <FaCheck />}
          </div>
        </label>
        <span className="pl-2 text-neutral-500">
          Send me an update on Whatsapp
        </span>
      </section>

      <Button>Submit</Button>
    </div>
  );
}
