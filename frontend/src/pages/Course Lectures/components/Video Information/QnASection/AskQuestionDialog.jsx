import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { askQnaSchema } from '../../../../../../yup';
import { FormProvider, useForm } from 'react-hook-form';
import CustomInputField from "@/components/CustomInputField"
import CustomButton from "@/components/CustomButton"

const AskQuestionDialog = ({ open, onClose, onSubmit }) => {
    const methods = useForm({
        resolver: yupResolver(askQnaSchema),
        defaultValues: {
            title: "",
            description: ""
        }
    })
    const onFormSubmit = (data) => {
        console.log("form data1: ", data);
        onSubmit(data);
        
    }
    const { reset } = methods;

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      reset({
        title: "",
            description: ""
      });
    }
  }, [open, reset]);
    return(
        <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Ask a Question</DialogTitle>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onFormSubmit)}>
            <DialogContent >
                <CustomInputField 
                    label="Title"
                    // margin="normal"
                    name="title"
                    margin="normal"
                />
                <CustomInputField 
                    label="Description"
                    name="description"
                    margin="normal"
                    multiline
            rows={4}
                />
          {/* <TextField
            label="Title"
            fullWidth
            margin="normal"
            name="title"
            value={question.title}
            onChange={(e) => setQuestion(prev => ({ ...prev, title: e.target.value }))}
          /> */}
          {/* <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            name="description"
            value={question.description}
            onChange={(e) => setQuestion(prev => ({ ...prev, description: e.target.value }))}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <CustomButton 
            type="submit"
            label="Post Question"
          />
        </DialogActions>
            </form>
        </FormProvider>
      </Dialog>
    )
}

export default AskQuestionDialog;
