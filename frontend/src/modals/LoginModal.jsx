import logo from "../../public/logopng.png";
import google from "../../public/imgs/google.svg";
import apple from "../../public/imgs/apple.svg";

import { RxCross2 } from "react-icons/rx";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useForm } from "react-hook-form";
import validator from "validator";

import Button from "../components/Button/Button";
import ButtonLoading from "../components/Button/ButtonLoading";
import { useLoginMutation } from "../services/auth.api";
import { login as loginReducer } from "../store/reducers/authReducer";

// import { loginUser } from "../services/operations/authApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../utils/formValidationSchema";
import { useNavigate } from "react-router-dom";

/**
 * LoginModal component for user authentication.
 * @param {Object} props - Component properties.
 * @param {boolean} props.loginModal - Controls the visibility of the login modal.
 * @param {Function} props.setLoginModal - Function to toggle login modal visibility.
 * @param {Function} props.setResetModal - Function to toggle reset password modal.
 * @param {Function} props.setSignupModal - Function to toggle signup modal.
 */
function LoginModal({
  loginModal,
  setLoginModal,
  setResetModal,
  setSignupModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signinSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();

  // const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  if (!loginModal) return null;

  /**
   * Handles form submission for user login.
   * @param {Object} data - Form data containing user credentials.
   * @returns {Promise<void>}
   */

  const loginFormSubmitHandler = async (data) => {
    try {
      const res = await login(data);
      if (res?.error) {
        throw new Error(JSON.stringify(res.error));
      }
      if (res?.data?.success) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;
        const user = res.data.data.user;

        dispatch(loginReducer({ accessToken, refreshToken, user }));
        toast.success("User Login successfully");
        navigate("/");
        reset();
      }
    } catch (err) {
      const error = JSON.parse(err?.message);
      if (error.status === 401) {
        toast.error(error.data.message);
      }
      if (error.status === 404) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
      onClick={() => setLoginModal(false)}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-3 relative w-[80vw] md:w-[43vw]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <div className="flex justify-between items-center">
          <div className="relative h-12 w-34">
            <img src={logo} className="h-full w-full absolute" alt="logo" />
          </div>
          <RxCross2
            onClick={() => setLoginModal(false)}
            className="text-lg cursor-pointer"
          />
        </div>
        <div className="p-6 flex flex-col w-[80%] mx-auto">
          <h2 className="text-xl font-semibold text-left">
            <span className=" font-bold">SignIn</span> to{" "}
            <span className=" text-primary font-extrabold ">Praxia </span>
            <span className="text-primary font-extrabold">Skill</span>
          </h2>
          

          <form
            className="flex flex-col gap-2 mt-4 text-sm"
            onSubmit={handleSubmit(loginFormSubmitHandler)}
          >
            <div>
              <label htmlFor="email" className="text-xs font-semibold">
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
                  className="text-sm absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              {errors?.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors?.password?.message}
                </p>
              )}
              <div className="flex justify-end text-xs text-[var(--alt-secondary-color)] hover:text-[var(--secondary-color)] text-center">
                <span
                  onClick={() => {
                    setResetModal(true);
                    setLoginModal(false);
                  }}
                  className="cursor-pointer hover:underline"
                >
                  Forgot password?
                </span>
              </div>
            </div>

            <Button
              type="submit"
              className={`py-2 h-8 w-full flex justify-center items-center rounded-md text-white cursor-pointer
                     disabled:bg-gray-400 ${isLoading && "cursor-not-allowed"}
                `}
              disabled={isLoading}
            >
              {isLoading ? <ButtonLoading /> : <p>Submit</p>}
            </Button>

            <p className="text-neutral-700 text-xs">
            <span>Don't have an account?</span>{" "}
            <span
              onClick={() => {
                setLoginModal(false);
                setSignupModal(true);
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              SignUp
            </span>
          </p>
          </form>

          <div className="h-10 w-full flex items-center relative">
            <div className="border-b border-neutral-300 w-full"></div>
            <span className="absolute text-xs text-neutral-700 bg-white p-2 left-1/2 -translate-x-1/2">
              or sign in with
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img
                src={apple}
                className="h-[60%] w-[70%] absolute"
                alt="apple-logo"
              />
            </div>
            <div className="flex justify-center items-center border h-9 w-16 relative border-neutral-300 hover:bg-neutral-100 rounded-lg">
              <img
                src={google}
                className="h-[60%] w-[70%] absolute"
                alt="google-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
