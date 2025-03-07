import { RxCross2 } from "react-icons/rx";

import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

import ButtonLoading from "../components/Button/ButtonLoading";
import { useResetPasswordMutation } from "../services/auth.api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../utils/formValidationSchema";
import { useNavigate, useParams } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";


/**
 * UpdatePasswordModal Component
 *
 * This component renders a modal for updating the password using an OTP verification system.
 * Users enter a six-digit OTP sent to their email and then update their password.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.email - The email of the user
 * @param {boolean} props.updatePasswordModal - State to control modal visibility
 * @param {Function} props.setUpdatePasswordModal - Function to toggle modal visibility
 * @param {Function} props.setLoginModal - Function to toggle the login modal
 */
function UpdatePasswordModal({
  email,
  updatePasswordModal,
  setUpdatePasswordModal,
}) {
  const [token, setToken] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const paramToken = params?.token;
    setToken(paramToken);
  }, [params?.token]);

  const modalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setUpdatePasswordModal(false);
      }
    };

    if (updatePasswordModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updatePasswordModal]);

  if (!updatePasswordModal) return null;

  /**
   * Closes the modal
   */
  const closeModal = () => {
    setUpdatePasswordModal(false);
  };
  /**
   * Handles OTP submission and dispatches the updatePassword action
   * @param {Object} e - Event object
   */

  const onSubmit = async (data) => {
    try {
      const result = await resetPassword({ data, token });
      if (result?.error) {
        throw new Error(JSON.stringify(result.error));
      }
      toast.success("Password Updated Successfully");
      setUpdatePasswordModal(false);
      navigate("/auth");
    } catch (err) {
      const error = JSON.parse(err.message);
      if (error.status === 401) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-lg z-50">
      <form
        ref={modalRef}
        className="bg-white flex flex-col gap-5 rounded-lg shadow-lg w-96 p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Password Reset</h3>
          <RxCross2
            className="cursor-pointer text-gray-600"
            onClick={closeModal}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-semibold">
            New Password
          </label>
          <div className="relative">
            <input
              type={!showPassword ? "password" : "text"}
              className="w-full px-2 py-1 border outline-0 rounded focus:border-blue-500"
              {...register("newPassword")}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          {errors?.newPassword && (
            <p className="text-red-500 text-xs ml-1 -mt-1">
              {errors?.newPassword?.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full flex justify-center items-center text-white p-2 rounded-lg transition ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-primary hover:bg-primary-hover"
          }`}
          disabled={isLoading}
        >
          {isLoading ? <ButtonLoading /> : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UpdatePasswordModal;
