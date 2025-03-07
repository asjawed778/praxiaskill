import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-hot-toast";

import ButtonLoading from "../components/Button/ButtonLoading";
import { useSendForgotPasswordOtpMutation } from "../services/auth.api";

/**
 * ResetPasswordModal Component - Handles resetting the password by sending a reset email.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.setEmail - Function to update the user's email state.
 * @param {boolean} props.resetModal - State to control the visibility of the modal.
 * @param {Function} props.setResetModal - Function to update modal visibility state.
 * @param {Function} props.setUpdatePasswordModal - Function to toggle the update password modal.
 */
function ResetPasswordModal({
  setEmail,
  resetModal,
  setResetModal,
  setUpdatePasswordModal,
}) {
  const [sendForgotPasswordOtp, { isLoading }] =
    useSendForgotPasswordOtpMutation();

  const [userEmail, setUserEmail] = useState({ email: "" });

  const isFormValid = userEmail.email.trim() !== "";

  if (!resetModal) return null;

  /**
   * Handles email input changes.
   * @param {Event} e - Input event.
   */
  const resetPasswordChangeHandler = (e) => {
    setUserEmail({ email: e.target.value });
  };

  /**
   * Handles the form submission to request a password reset.
   * @param {Event} e - Form submission event.
   */
  const resetPasswordSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { email } = userEmail;
      setEmail(email);
      const res = await sendForgotPasswordOtp(userEmail);
      console.log("reset password result", res)
      if (res?.error) {
        throw new Error(JSON.stringify(res.error));
      }
      toast.success("Email sent successfully");
      setUserEmail({ email: "" });
    } catch (err) {
      const error = JSON.parse(err?.message);
      if (error.status === 404) {
        toast.error(error.data.message);
      }
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-lg"
      onClick={() => setResetModal(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={() => setResetModal(false)}
        >
          <RxCross1 size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>

        <form className="space-y-4" onSubmit={resetPasswordSubmitHandler}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-2 py-1 border outline-0 rounded focus:border-blue-500"
              maxLength="50"
              value={userEmail.email}
              name="email"
              onChange={resetPasswordChangeHandler}
            />
          </div>

          <button
            className={`w-full flex justify-center items-center p-2 rounded-md text-white ${
              isFormValid
                ? "bg-primary hover:bg-primary-hover"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            {isLoading ? <ButtonLoading /> : <p>Submit</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordModal;
