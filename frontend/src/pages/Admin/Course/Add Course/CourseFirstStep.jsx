import { Box, Grid } from "@mui/material";
import CustomInputField from "../../../../components/CustomInputField";
import { CourseMode, Language } from "../../../../utils/enum";
import CustomDropdownField from "../../../../components/CustomDropdownField";
import CustomRadioButton from "../../../../components/CustomRadioButton";
import CustomButton from "../../../../components/CustomButton";
import ImageUploader from "../../../../components/ImageUploader";
import FileUploader from "../../../../components/FileUploader";

const CourseFirstStep = ({ handleNext }) => {
  const languageOptions = [
    { label: "English", value: Language.ENGLISH },
    { label: "Hindi", value: Language.HINDI },
    { label: "English + Hindi", value: Language.ENGLISH_HINDI },
  ];
  const courseModeOptons = [
    { label: "Online", value: CourseMode.ONLINE },
    { label: "Offline", value: CourseMode.OFFLINE },
    { label: "Hybrid", value: CourseMode.HYBRID },
  ];
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <CustomInputField
            name="title"
            label="Title"
            placeholder="Enter the course title"
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <CustomInputField
            name="subtitle"
            label="SubTitle"
            placeholder="Enter the course subtitle"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomDropdownField
            name="language"
            label="Seclect Language"
            options={languageOptions}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomDropdownField
            name="category"
            label="Seclect Category"
            endpoint="course/category"
          />
        </Grid>
        {/* <Grid size={{ xs: 12, sm: 6 }}>
          <CustomDropdownField
            name="instructor"
            label="Seclect Instructor"
            endpoint="course/instructors"
          />
        </Grid> */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomRadioButton
            name="courseMode"
            label="Course Mode:"
            options={courseModeOptons}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }} mt={3}>
          <CustomInputField
            name="courseLevel"
            label="Course Level"
            placeholder="Enter course level (e.g: Intermediate to advance)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <ImageUploader
            name="thumbnail"
            label="Upload Thumbnail"
            width={500}
            height={250}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FileUploader name="brouchure" label="Upload Brouchure" />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 4,
        }}
      >
        <CustomButton label="Next" onClick={handleNext} />
      </Box>
    </Box>
  );
};

export default CourseFirstStep;
