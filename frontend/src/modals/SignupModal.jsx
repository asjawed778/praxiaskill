// import logo from "/logopng.png";
import logo from "../assets/logo-red-transparent-bg.png";
import google from "/imgs/google.svg";
import apple from "/imgs/apple.svg";

import { toast } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import { useForm } from "react-hook-form";
import validator from "validator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import ButtonLoading from "../components/Button/ButtonLoading";
import { useSendSignupOtpMutation } from "../services/auth.api";

import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../utils/formValidationSchema";
import Button from "../components/Button/Button";
import { use } from "react";

/**
 * SignupModal Component
 *
 * This component renders a signup modal that allows users to register an account.
 * It includes form validation, password visibility toggling, and OTP dispatching.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.signupModal - Controls the visibility of the signup modal
 * @param {Function} props.setSignupModal - Function to set the signup modal visibility
 * @param {Function} props.setOtpModal - Function to set the OTP modal visibility
 * @param {Function} props.setSignupData - Function to store signup form data
 * @param {Function} props.setLoginModal - Function to toggle login modal visibility
 */
function SignupModal({
  signupModal,
  setSignupModal,
  setOtpModal,
  setSignupData,
  setLoginModal,
}) {
  const [sendSignupOtp, { isLoading, error }] = useSendSignupOtpMutation();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  /**
   * Closes the signup modal.
   */
  const signupModalCloseHandler = () => {
    setSignupModal(false);
  };

  /**
   * Handles overlay click to close the modal.
   * @param {Event} e - Click event
   */
  const overlayClickHandler = (e) => {
    if (e.target.id === "signup-modal-overlay") {
      setSignupModal(false);
    }
  };

  /**
   * Handles the signup form submission.
   * @param {Object} data - Form data containing user credentials
   */

  const signupFormSubmitHandler = async (data) => {
    setSignupData(data);
    try {
      const result = await sendSignupOtp(data).unwrap();
      setSignupData(data);
      if (result?.error) {
        throw new Error(JSON.stringify(result.error));
      }
      toast.success("OTP sent successfully");
      setSignupModal(false);
      setOtpModal(true);
      reset();
    } catch (err) {
      const error = JSON.parse(err.message);
      if (error.status === 409) {
        toast.error(error.data.message);
      }
      if (error.status === 400) {
        toast.error(error.data.message);
      }
    }
  };
  if (!signupModal) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-lg z-50 flex items-center justify-center"
      onClick={overlayClickHandler}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-3 relative w-[90vw] md:w-[550px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div className="relative h-8 w-34">
            <img src={logo} className="h-full w-full absolute" alt="logo" />
          </div>
          <RxCross2
            onClick={signupModalCloseHandler}
            className="text-lg cursor-pointer"
          />
        </div>
        <div className="p-5 flex flex-col w-[80%] mx-auto">
          <p className="text-neutral-700 text-xs font-semibold">
            Start your journey
          </p>
          <h2 className="text-xl font-semibold text-left ">
            <span className="font-bold">SignUp</span> to{" "}
            <span className="text-primary font-extrabold">Praxia </span>
            <span className="text-primary font-extrabold">Skill</span>
          </h2>
          <form
            className="flex flex-col gap-2 mt-4 text-sm"
            onSubmit={handleSubmit(signupFormSubmitHandler)}
          >
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label htmlFor="name" className="text-xs font-semibold">
                  Name
                </label>
              </div>
              <input
                {...register("name")}
                id="name"
                type="text"
                className="w-full outline-0 border px-2 py-1 rounded focus:border-[var(--secondary-color)]"
              />
              {errors?.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.name?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-semibold mb-0.5">
                Email
              </label>
              <input
                {...register("email", {
                  validate: (value) =>
                    validator.isEmail(value) || "Invalid email address",
                })}
                id="email"
                type="email"
                className="w-full outline-0 border px-2 py-1 rounded focus:border-[var(--secondary-color)]"
              />
              {errors?.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-0.5">
                <label htmlFor="password" className="text-xs font-semibold ">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  className="w-full outline-0 border px-2 py-1 rounded focus:border-[var(--secondary-color)]"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <Button
                type="submit"
                disabled={isLoading}
                className={`flex items-center justify-center gap-2 py-2 h-8 w-full  text-xs text-white rounded-md  disabled:bg-gray-400 ${isLoading && "cursor-not-allowed"
                  } cursor-pointer`}
              >
                {isLoading ? (
                  <>
                    <ButtonLoading />{" "}
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </div>
            <div className="text-xs mb-4">
              <span>Already have an account?</span>{" "}
              <span
                onClick={() => {
                  setSignupModal(false);
                  setLoginModal(true);
                }}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </div>
          </form>

          {/* temporirily it has been diactivated */}
          {/* <div className="h-10 w-full flex items-center relative">
            <div className="border-b border-neutral-300 w-full"></div>
            <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">
              or sign up with
            </span>
          </div> */}

          {/* <div className="flex items-center justify-center gap-3">
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg cursor-pointer">
              <img
                src={apple}
                className="h-[60%] w-[70%] absolute"
                alt="apple-logo"
              />
            </div>
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg cursor-pointer">
              <img
                src={google}
                className="h-[60%] w-[70%] absolute"
                alt="google-logo"
              />
            </div>
          </div> */}


        </div>
      </div>
    </div>
  );
}

export default SignupModal;
