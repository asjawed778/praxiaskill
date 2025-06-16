// Importing React Icons
import { RxCross2 } from "react-icons/rx";

import clsx from "clsx";
import { forwardRef } from "react";
import Basic from "./Basic";


const InputField = forwardRef(
  (
    {
      children,
      type = "text",
      placeholder = "",
      className = "bg-white",
      parentClassName = "",
      labelClassName = "",
      id = "default",
      variant = "default",
      value,
      required,
      setvalue,
      removeImage = () => {},
      removePdf = () => {},
      onChange = () => {},
      onClick = () => {},
      ...rest
    },
    ref
  ) => {
    const variantClasses = {
      default: "",
      inverse: "",
      red: "",
    };

    return (
      <div
        className={clsx(
          "flex flex-col gap-2",
          variantClasses[variant] || variantClasses.default,
          parentClassName
        )}
      >
        {/* Label Field */}
        <label
          htmlFor={id}
          className={clsx(
            "w-fit cursor-pointer",
            variantClasses[variant] || variantClasses.default,
            labelClassName
          )}
        >
          {children}
        </label>

        {/* Input Field */}
        {type === "image" ? (
          <Image
            setvalue={setvalue}
            id={id}
            onChange={onChange}
            ref={ref} // Attach ref for React Hook Form
            {...rest}
          />
        ) : type === "pdf" ? (
          <Pdf
            setvalue={setvalue}
            id={id}
            file={value}
            onChange={onChange}
            ref={ref} // Attach ref for React Hook Form
            {...rest}
          />
        ) : type === "video" ? (
          <Video id={id} ref={ref} required={required} {...rest} />
        ) : (
          <Basic
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            className={className}
            variantClasses={variantClasses}
            onChange={onChange}
            onClick={onClick}
            ref={ref} // Attach ref for React Hook Form
            {...rest}
          />
        )}
      </div>
    );
  }
);

export default InputField;
