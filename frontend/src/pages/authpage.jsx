import logo from "/logopng.png";
import googleImage from "/imgs/google.svg";
import appleImage from "/imgs/apple.svg";
import { FaArrowLeft } from "react-icons/fa6";


import { useEffect, useState } from "react";

import SignupModal from "../modals/SignupModal";
import OTPModal from "../modals/OTPModals";
import LoginModal from "../modals/LoginModal";
import ResetPasswordModal from "../modals/ResetPasswordModal";
import UpdatePasswordModal from "../modals/UpdatePasswordModal";
import { Link, useNavigate } from "react-router-dom";

// Initial Page on Screen
function AuthPage({reset=false}) {
  const navigate = useNavigate()

  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [signupData, setSignupData] = useState(null);
  
  const [resetModal, setResetModal] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);

  //to invoke the reset passoword modal
  
  useEffect(() => {
    if(reset)
    {
      setResetModal(false);
      setUpdatePasswordModal(true);
    }
  },[reset])

  // email to send while changing password
  const [email, setEmail] = useState("");

  // to invoke signup modal
  const createAccountHandler = () => {
    setSignupModal(true);
    setOtpModal(false);
  };

  // to invoke login modal
  const loginAccountHandler = () => {
    setLoginModal(true);
  };

  return (
    <>
      <div onClick={() => navigate("/")} className="absolute left-5 top-3 font-semibold flex gap-2 items-center cursor-pointer text-[var(--alt-secondary-color)] hover:text-[var(--secondary-color)]">
        <FaArrowLeft />
        <span className="mb-1">Back to home</span>
      </div>
      <div className="flex flex-wrap items-center justify-between h-screen py-10 px-20">
        {/* First Row */}
        <div className="flex flex-col items-start gap-2 mb-6 mx-auto">
          <img onClick={() => navigate("/")} src={logo} alt="logo" className="w-[450px] h-auto -ml-9 cursor-pointer" />
          <p className="font-bold text-lg text-[var(--alt-secondary-color)] flex flex-col ml-3">
            <span>Ready For the Future</span>
            <span>At Praxia Skill</span>
          </p>
        </div>

        {/* Second Row */}
        <div className="flex flex-col gap-5 w-[25rem] mx-auto">
          {/* temporarily this part is deactivated */}
          {/* <button className="hover:bg-gray-100 flex items-center justify-center px-5 py-3 border border-black rounded-full duration-300 cursor-pointer">
            <img src={googleImage} alt="Google" className="h-5 w-fit" />
            <p>Sign up with Google</p>
          </button>

          <button className="hover:bg-gray-100 flex items-center justify-center px-5 py-3 border border-black rounded-full duration-300 cursor-pointer">
            <img src={appleImage} alt="Apple" className="h-5 w-fit" />
            <p>Sign up with Apple</p>
          </button>

          <div className="relative">
            <span className="absolute -top-[15px] left-[50%] text-lg text-gray-400 bg-white px-2">
              or
            </span>
            <hr />
          </div> */}

          <button
            className="text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)] px-5 py-3 rounded-full duration-300 cursor-pointer"
            onClick={createAccountHandler}
          >
            Create account
          </button>

          <p className="text-gray-600 text-sm">
            <span>By signing up, you agree to the </span>
            <Link to="" className="text-[var(--color-primary)]">
              Terms of Service
            </Link>
            <span> and </span>
            <Link to="" className="text-[var(--color-primary)]">
              Privacy Policy
            </Link>
            <span>, including </span>
            <Link to="" className="text-[var(--color-primary)]">
              Cookie Use.
            </Link>
          </p>

          <button
            className="text-[var(--color-primary)] hover:text-white hover:bg-[var(--color-primary)] active:bg-[var(--color-primary-active)] border border-[var(--color-primary)] px-5 py-3 rounded-full duration-300 cursor-pointer"
            onClick={loginAccountHandler}
          >
            SignIn
          </button>
        </div>
      </div>

      <SignupModal
        signupModal={signupModal}
        setSignupModal={setSignupModal}
        setOtpModal={setOtpModal}
        setSignupData={setSignupData}
        setLoginModal={setLoginModal}
      />
      <OTPModal
        otpModal={otpModal}
        setOtpModal={setOtpModal}
        signupData={signupData}
      />
      <LoginModal
        loginModal={loginModal}
        setLoginModal={setLoginModal}
        setResetModal={setResetModal}
        setSignupModal={setSignupModal}
      />
      <ResetPasswordModal
        setEmail={setEmail}
        resetModal={resetModal}
        setResetModal={setResetModal}
        setUpdatePasswordModal={setUpdatePasswordModal}
      />
      <UpdatePasswordModal
        email={email}
        updatePasswordModal={updatePasswordModal}
        setUpdatePasswordModal={setUpdatePasswordModal}
        setLoginModal={setLoginModal}
      />
    </>
  );
}

export default AuthPage;
