import React from 'react';
import { Button, CircularProgress, ButtonProps } from '@mui/material';

export interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;                
  type?: 'button' | 'submit' | 'reset'; 
  children: React.ReactNode;
}

const CustomButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  type = 'button',
  children,
  disabled,
  ...rest
}) => {
  return (
    <Button
      type={type}
      disabled={isLoading || disabled}
      sx={{
        cursor: isLoading ? 'not-allowed' : 'pointer'
      }}
      {...rest}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
};

export default CustomButton;
