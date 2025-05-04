import { useState } from "react";
import Button from "../Button/Button";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSendEnquiryMutation } from "../../services/course.api";
import ButtonLoading from "../Button/ButtonLoading";
import { toast } from "react-hot-toast";
import { EnquirySchema } from "../../../yup";

export default function BookDemoClass() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EnquirySchema),
  });
  const [sendEnquiry, { isLoading, error }] = useSendEnquiryMutation();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const onSubmit = async(data) => {
    try {
      const res = await sendEnquiry(data);
      if (res?.error) {
        throw new Error(JSON.stringify(res.error));
      }
      if (res?.data?.success) {
        setValue("whatsAppOptIn", false)
        setIsChecked(false)
        reset();
        toast.success("Enquiry sent successfully!")
      }
    } catch (err) {
      const error = JSON.parse(err?.message);
      console.log("Error sending enquiry message", error)
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white flex flex-col gap-3 my-5 p-5 h-auto w-[84vw] md:w-[350px] lg:w-[351.15px] drop-shadow-2xl shadow-xl rounded-xl mx-auto md:mx-0"
    >
      <h1 className="font text-xl text-[var(--color-primary)]">
        Book a Live Class, For Free!
      </h1>

      {/* Name */}
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Full Name"
          className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] border-gray-300 text-neutral-800 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
        />
        {errors?.name && (
          <p className="text-red-500 text-xs mt-0.5">{errors?.name?.message}</p>
        )}
      </div>

      {/* Education */}
      <div>
        <input
          {...register("education")}
          type="text"
          placeholder="Education"
          className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
        />
        {errors?.education && (
          <p className="text-red-500 text-xs mt-0.5">
            {errors?.education?.message}
          </p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <input
          {...register("phone")}
          type="number"
          placeholder="Phone No"
          className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
        />
        {errors?.phone && (
          <p className="text-red-500 text-xs mt-0.5">
            {errors?.phone?.message}
          </p>
        )}
      </div>

      {/* Email Id */}
      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email Id"
          className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
        />
        {errors?.email && (
          <p className="text-red-500 text-xs mt-0.5">
            {errors?.email?.message}
          </p>
        )}
      </div>

      {/* Interested Course */}
      <div>
        <input
          {...register("interestedCourse")}
          type="text"
          placeholder="Interested Course"
          className="w-full h-10 px-3 py-1 border-t bg-[#F2F4F7] text-neutral-800 border-gray-300 rounded-md outline-none placeholder:text-neutral-400 focus:ring-1 focus:ring-[var(--alt-secondary-color)]"
        />
        {errors?.interestedCourse && (
          <p className="text-red-500 text-xs mt-0.5">
            {errors?.interestedCourse?.message}
          </p>
        )}
      </div>

      <section className="flex items-center">
        <input
          hidden
          type="checkbox"
          id="Whatsapp"
          checked={isChecked}
          onChange={(e) => setValue("whatsAppOptIn", !e.target.checked)}
        />
        <label htmlFor="Whatsapp" className="cursor-pointer">
          <div
            onClick={handleCheckboxChange}
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

      <Button
        type="submit"
        className={`py-2 h-8 w-full flex justify-center items-center rounded-md text-white cursor-pointer
                     disabled:bg-gray-400 ${isLoading && "cursor-not-allowed"}
                `}
        disabled={isLoading}
      >
        {isLoading ? <ButtonLoading /> : <p>Submit</p>}
      </Button>
    </form>
  );
}
