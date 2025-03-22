import React from "react";
import clsx from "clsx"; // Optional, install via: npm i clsx

const Button = ({
  children,
  type,
  onClick = () => {},
  variant = "default",
  className = "",
}) => {
  const variantClasses = {
    default:
      "text-white bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-active)]",
    inverse: "bg-white text-[var(--color-primary)]",
    red: "text-white bg-red-600 rounded-full hover:bg-red-900",
  };

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={clsx(
        "whitespace-nowrap px-5 py-2 rounded-md cursor-pointer duration-200",
        variantClasses[variant] || variantClasses.default,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
