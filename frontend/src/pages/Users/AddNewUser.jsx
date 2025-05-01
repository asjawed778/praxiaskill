import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton";
import CustomInputField from "../../components/CustomInputField";
import ModalWrapper from "../../components/ModalWrapper";
import { Box, Stack } from "@mui/material";
import CustomDropdown from "../../components/CustomDropdown";
import { UserRole } from "../../utils/enum";
import { useAddNewUserMutation, useUpdateUserDetailsMutation } from "../../services/usersApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addNewUserSchema } from "../../../yup";

const AddNewUser = ({ open, onClose, userData, isEditMode }) => {
  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  const [updateUser, {isLoading: isUpdating}] = useUpdateUserDetailsMutation();
  

  const roleOptions = Object.entries(UserRole).map(([key, value]) => ({
    label: key.replace("_", " "), // Optional: Format the key for better readability
    value: value,
  }));

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(addNewUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
    }
  });
  useEffect(() => {
    if (open) {
      if (userData && isEditMode) {
        reset({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
      } else {
        reset({
          name: "",
          email: "",
          role: "",
        });
      }
    }
  }, [open, userData, isEditMode, reset]);
  

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateUser({ userId: userData?._id, updatedData: data }).unwrap();
        toast.success("User updated successfully!");
      } else {
        await addNewUser(data).unwrap();
        toast.success("New user added successfully!");
      }
      onClose();
      reset();
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title={isEditMode ? "Update User Details" : "Add New User"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} mt={2}>
          <CustomInputField
            name="name"
            label="Full Name"
            control={control}
          />
          <CustomInputField
            name="email"
            label="Email"
            type="email"
            control={control}
          />
          <CustomDropdown
            name="role"
            control={control}
            label="Role"
            options={roleOptions}
          />
          <CustomButton 
          fullWidth 
          label={isEditMode ? "Update User" : "Add User"} 
          type="submit" 
          loading={isLoading || isUpdating}
          />
        </Stack>
      </form>
    </ModalWrapper>
  );
};
export default AddNewUser;
