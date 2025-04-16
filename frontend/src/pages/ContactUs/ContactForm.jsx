// components/ContactForm.jsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  IconButton,
  InputAdornment,
} from '@mui/material';
import { InsertEmoticon as EmojiIcon } from '@mui/icons-material';
import { useAppTheme } from '../../context/ThemeContext';
import { yupResolver } from '@hookform/resolvers/yup';
import {contactUsSchema} from "../../pages/ContactUs/contactUsSchema"


// Form field configuration for DRY code
const formFields = [
  { 
    name: 'name', 
    label: 'Your Name', 
    placeholder: 'John Trangely',
    gridSize: { xs: 12, md: 6 },
  },
  { 
    name: 'email', 
    label: 'Your Email', 
    placeholder: 'abc@gmail.com',
    gridSize: { xs: 12, md: 6 },
  },
  { 
    name: 'subject', 
    label: 'Your Subject', 
    placeholder: 'I want to hire you quickly',
    gridSize: { xs: 12 },
  },
];

// Common TextField styles
const textFieldStyles = {
  '& .MuiInput-underline:before': {
    borderBottomColor: 'colors.primary',
  },
  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: "white",
  },
};

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useAppTheme();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(contactUsSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      const response = await submitForm(data).unwrap();
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Error submitting form.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {/* Render standard form fields */}
        {formFields.map((field) => (
          <Grid size={{...field.gridSize}} key={field.name}>
            <Typography variant="caption" color="textSecondary">{field.label}</Typography>
            <Controller
              name={field.name}
              control={control}
              rules={field.rules}
              render={({ field: fieldProps }) => (
                <TextField
                  {...fieldProps}
                  fullWidth
                  variant="standard"
                  placeholder={field.placeholder}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message}
                  sx={textFieldStyles}
                />
              )}
            />
          </Grid>
        ))}
        <Grid size={{xs: 12}}>
          <Typography variant="caption" color="textSecondary">Message</Typography>
          <Controller
            name="message"
            control={control}
            rules={{ required: "Message is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                variant="standard"
                multiline
                rows={4}
                placeholder="Write here your message"
                error={!!errors.message}
                helperText={errors.message?.message}
                sx={textFieldStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
        </Grid>
         <Grid item xs={12}>
         <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;