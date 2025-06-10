// import React from "react";
// import { Button, CircularProgress } from "@mui/material";

// const CustomButton = ({
//   label,
//   onClick,
//   type = "button",
//   variant = "contained",
//   color = "primary",
//   size = "small",
//   fullWidth = false,
//   disabled = false,
//   loading = false,
//   startIcon,
//   endIcon,
//   className,
//   sx = {},
//   style = {},
//   ...rest
// }) => {
//   return (
//     <Button
//       type={type}
//       variant={variant}
//       color={color}
//       size={size}
//       fullWidth={fullWidth}
//       disabled={disabled || loading}
//       onClick={onClick}
//       startIcon={!loading && startIcon}
//       endIcon={!loading && endIcon}
//       className={className}
//       sx={{
//         fontSize: "14px",
//         borderRadius: 2,
//         textTransform: "none",
//         // width: "fit-content",
//          width: fullWidth ? "100%" : "auto",
//         ...sx,
//       }}
//       {...rest}
//     >
//       {loading ? <CircularProgress size={25} color="inherit" /> : label}
//     </Button>
//   );
// };

// export default CustomButton;




import React from "react";
import { Button, CircularProgress } from "@mui/material";

const CustomButton = ({
  label,
  onClick,
  type = "button",
  variant = "contained",
  color = "primary",
  size = "small",
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  className,
  sx = {},
  style = {},
  ...rest
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onClick={onClick}
      startIcon={!loading && startIcon}
      endIcon={!loading && endIcon}
      className={className}
      sx={{
        fontSize: "14px",
        borderRadius: 1.5,
        textTransform: "none",
        width: fullWidth ? "100%" : "max-content",
        maxWidth: fullWidth ? "100%" : "none",
        display: "inline-flex",
        minWidth: 75,
        ...sx,
      }}
      style={style}
      {...rest}
    >
      {loading ? <CircularProgress size={25} color="inherit" /> : label}
    </Button>
  );
};

export default CustomButton;
