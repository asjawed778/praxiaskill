import clsx from "clsx";
import { forwardRef } from "react";

const Basic = forwardRef(
  (
    {
      id,
      type,
      placeholder,
      required = false,
      className,
      variantClasses,
      onChange = () => {},
      onClick = () => {},
      ...rest
    },
    ref
  ) => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        onClick(event);
      }
    };

    return (
      <input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className={clsx(
          "px-4 py-2 border border-gray-300 rounded-md outline-none",
          variantClasses?.variant || variantClasses?.default,
          className
        )}
        ref={ref} // Attach ref for React Hook Form
        {...rest}
      />
    );
  }
);

export default Basic;