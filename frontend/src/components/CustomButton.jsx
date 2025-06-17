// import { Button, CircularProgress, Box } from "@mui/material";

// const CustomButton = ({
//   label,
//   onClick,
//   type = "button",
//   variant = "contained",
//   color = "primary",
//   size = "medium",
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
//   const isDisabled = disabled || loading;
//  const responsiveWidth = fullWidth
//     ? "100%"
//     : { xs: "100%", sm: "auto" }; 
//   return (
//     <Box
//       sx={{
//         display: "inline-block",
//         width: responsiveWidth,
//         cursor: isDisabled ? "not-allowed" : "pointer",
//       }}
//     >
//       <Button
//         type={type}
//         variant={variant}
//         color={color}
//         size={size}
//         fullWidth={fullWidth}
//         disabled={isDisabled}
//         onClick={onClick}
//         startIcon={!loading && startIcon}
//         endIcon={!loading && endIcon}
//         className={className}
//         sx={{
//           fontSize: "14px",
//           borderRadius: 1.5,
//           textTransform: "none",
//            minWidth: 75,
//           width: "100%", 
//           ...sx,
//         }}
//         style={style}
//         {...rest}
//       >
//         {loading ? <CircularProgress size={25} color="inherit" /> : label}
//       </Button>
//     </Box>
//   );
// };

// export default CustomButton;





import { Button, CircularProgress, Box } from "@mui/material";

const CustomButton = ({
  label,
  onClick,
  type = "button",
  variant = "contained",
  color = "primary",
  size = "medium",
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
  const isDisabled = disabled || loading;
 const responsiveWidth = fullWidth
    ? "100%"
    : "auto"; 
  return (
    <Box
      sx={{
        display: "inline-block",
        width: responsiveWidth,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
    >
      <Button
        type={type}
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        disabled={isDisabled}
        onClick={onClick}
        startIcon={!loading && startIcon}
        endIcon={!loading && endIcon}
        className={className}
        sx={{
          fontSize: "14px",
          borderRadius: 1.5,
          textTransform: "none",
           minWidth: 75,
          width: "100%", 
          ...sx,
        }}
        style={style}
        {...rest}
      >
        {loading ? <CircularProgress size={25} color="inherit" /> : label}
      </Button>
    </Box>
  );
};

export default CustomButton;







