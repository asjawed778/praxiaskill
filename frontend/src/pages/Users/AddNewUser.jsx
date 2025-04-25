import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import CustomInputField from "../../components/CustomInputField";
import ModalWrapper from "../../components/ModalWrapper";
import { Box, Stack } from "@mui/material";
import CustomDropdown from "../../components/CustomDropdown";
import { UserRole } from "../../utils/enum";

const AddNewUser = ({ open, onClose }) => {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("New User Data: ", data);
    onClose();
  };

  const roleOptions = Object.entries(UserRole).map(([key, value]) => ({
    label: key.replace("_", " "),  // Optional: Format the key for better readability
    value: value,
  }));
  console.log("Options: ", roleOptions);
  
  return (
    <ModalWrapper open={open} onClose={onClose} title="Add New User">
      <form onSubmit={handleSubmit(onSubmit)} >
        <Stack  spacing={2}>
        <CustomInputField name="fullName" label="Full Name" control={control} />
        <CustomInputField
          name="email"
          label="Email"
          type="email"
          control={control}
        />
        <CustomDropdown name="role" control={control} label="Role" options={roleOptions} />
        <CustomButton fullWidth label="Add User" type="submit" />
        </Stack >
      </form>
    </ModalWrapper>
  );
};
export default AddNewUser;
