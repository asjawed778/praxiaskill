import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  useFormContext,
  useFieldArray,
  useWatch,
  FormProvider,
  useForm,
} from "react-hook-form";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaPlus } from "react-icons/fa";
import required from "@/assets/icons/required.svg";
import CustomButton from "@/components/CustomButton";
import CustomInputField from "@/components/CustomInputField";
import SubSectionFields from "./SubSectionFields";
import ProjectFields from "./ProjectFields";
import AssignmentFields from "./AssignmentsFields";
import { Tooltip, IconButton } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { courseStructureSchema } from "../../../../../yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDeleteCurriculumMutation,
  useGetFullCourseContentQuery,
  useUpdateCurriculumMutation,
} from "../../../../services/course.api";
import { Delete } from "@mui/icons-material";
import toast from "react-hot-toast";
import { cleanData } from "../../../../utils/helper";
import DialogBoxWrapper from "@/components/DialogBoxWrapper";

const SectionAccordion = ({
  courseId,
  field,
  sectionIndex,
  control,
  register,
  errors,
  expanded,
  onExpand,
  removeSection,
  totalSections,
}) => {
  const [openDeleteModule, setOpenDeleteModule] = useState(false);
  const [deleteModule] = useDeleteCurriculumMutation();
  const sectionTitle = useWatch({
    control,
    name: `sections.${sectionIndex}.title`,
    defaultValue: "",
  });

  const handleDeleteSection = async (sectionIndex, sectionId) => {
    const removedSection = control._formValues.sections[sectionIndex];
    removeSection(sectionIndex);
    try {
      await deleteModule({ courseId, sectionId }).unwrap();
    } catch (error) {
      const currentSections = control._formValues.sections || [];
      const updated = [...currentSections];
      updated.splice(sectionIndex, 0, removedSection);
      control._updateFieldArray("sections", updated);
      toast.error(
        error?.data?.message || "Failed to delete section. Try Agian!"
      );
    }
  };

  return (
    <Accordion
      expanded={expanded === field.id}
      onChange={onExpand(field.id)}
      sx={{
        color: "black",
        mb: 1,
        borderLeft: "6px solid #00e676",
        borderRadius: 2,
        boxShadow: "0 0 10px rgba(0, 230, 118, 0.2)",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#00e676" }} />}
        sx={{ px: 1, position: "relative", pr: 5 }}
      >
        {totalSections > 1 && (
          <Tooltip title="Remove Module">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModule(true);
              }}
              size="small"
              sx={{
                position: "absolute",
                top: 15,
                right: 8,
                zIndex: 2,
                color: "error.main",
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "#ffe6e6",
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        )}

        <Box display="flex" alignItems="center" gap={2}>
          <Chip
            label={`Module ${sectionIndex + 1}`}
            sx={{ bgcolor: "#00e676", fontWeight: "bold" }}
          />
          <Typography sx={{ fontWeight: 500 }}>
            {sectionTitle || "You have not created this module yet."}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 2 }}>
        <Stack spacing={1}>
          <CustomInputField
            name={`sections.${sectionIndex}.title`}
            label="Title"
            placeholder="Enter section title"
          />
          <CustomInputField
            name={`sections.${sectionIndex}.description`}
            label="Description"
            placeholder="Enter section description"
            multiline
            row={2}
            required={false}
          />

          <SubSectionFields
            control={control}
            sectionIndex={sectionIndex}
            courseId={courseId}
            sectionId={field._id}
          />
          <AssignmentFields
            control={control}
            sectionIndex={sectionIndex}
            errors={errors}
          />
          <ProjectFields
            register={register}
            control={control}
            sectionIndex={sectionIndex}
            errors={errors}
          />
        </Stack>
      </AccordionDetails>
      {openDeleteModule && (
        <DialogBoxWrapper
          open={openDeleteModule}
          onClose={() => setOpenDeleteModule(false)}
          onConfirm={() => handleDeleteSection(sectionIndex, field._id)}
          title="Delete Module"
          message={
            <>
              Are you sure want to delete <strong>"{field.title}"</strong>{" "}
              module?
            </>
          }
        />
      )}
    </Accordion>
  );
};

const UpdateCurriculum = () => {
  const [expandOnNextUpdate, setExpandOnNextUpdate] = useState(null);
  const { courseId } = useParams();
  const navigate = useNavigate();
  const {
    data: courseDetails,
    isLoading: isCourseLoading,
    isFetching,
  } = useGetFullCourseContentQuery(courseId);
  const [updateCurriculum, { isLoading: isUpdating }] =
    useUpdateCurriculumMutation();
  const methods = useForm({
    resolver: yupResolver(courseStructureSchema),
    defaultValues: {
      sections: [
        {
          title: "",
          description: "",
          subSections: [{ title: "", description: "" }],
        },
      ],
    },
    mode: "onBlur",
  });
  const {
    control,
    register,
    trigger,
    formState: { errors },
  } = methods;
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "sections",
    keyName: "id",
  });

  const [expanded, setExpanded] = useState(() =>
    sectionFields.length > 0 ? sectionFields[0].id : null
  );

  const handleExpand = (panelId) => (_, isExpanded) => {
    setExpanded(isExpanded ? panelId : null);
  };
  useEffect(() => {
    if (expandOnNextUpdate !== null && sectionFields[expandOnNextUpdate]?.id) {
      setExpanded(sectionFields[expandOnNextUpdate].id);
      setExpandOnNextUpdate(null); 
    }
  }, [sectionFields, expandOnNextUpdate]);

  useEffect(() => {
    if (courseDetails?.data?.sections?.length) {
      const transformedSections = courseDetails.data.sections.map(
        (section) => ({
          ...section,
          assignments:
            section.assignments?.map((a) => ({ assignment: a })) || [],
          projects: section.projects?.map((p) => ({ project: p })) || [],
        })
      );
      methods.reset({ sections: transformedSections });
    }
  }, [courseDetails]);

  const onSubmit = async (data) => {
    console.log("data: ", data);
    data?.sections?.forEach((section) => {
      section.assignments = section.assignments?.map((item) => item.assignment);
    });
    data?.sections?.forEach((section) => {
      section.projects = section.projects?.map((item) => item.project);
    });
    const freshData = cleanData(data);
        console.log("freshData: ", freshData);

    try {
      const res = await updateCurriculum({
        courseId,
        body: freshData,
      }).unwrap();
      toast.success("Curriculum update successfully!");
      navigate("/dashboard/courses");
    } catch (error) {
      const errorMsg =
        error?.data?.message || "Failed to update curriculum. Try again!";
      toast.error(errorMsg);
      console.log("Error: ", error);
    }
  };
  if (isCourseLoading || isFetching) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress size={30} />
      </Box>
    );
  }
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box sx={{ borderRadius: 2, p: 2 }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              mb: 1,
            }}
          >
            Update Curriculum
          </Typography>
          <Box position="relative" width="fit-content" mb={1}>
            <Box
              component="img"
              src={required}
              alt="required"
              sx={{
                width: 8,
                height: 8,
                position: "absolute",
                top: 6,
                right: -12,
              }}
            />
          </Box>

          {sectionFields.map((field, index) => (
            <SectionAccordion
              key={field.id}
              courseId={courseId}
              field={field}
              sectionIndex={index}
              control={control}
              register={register}
              errors={errors}
              expanded={expanded}
              onExpand={handleExpand}
              removeSection={removeSection}
              totalSections={sectionFields.length}
            />
          ))}

          <CustomButton
            label="Add More Module"
            onClick={async () => {
              const isValid = await trigger();
              if (!isValid) return;

              const newSection = {
                title: "",
                description: "",
                subSections: [{ title: "", description: "" }],
              };
              const nextIndex = sectionFields.length;
              appendSection(newSection);
              setExpandOnNextUpdate(nextIndex);
            }}
            startIcon={<FaPlus />}
            sx={{ mt: 2 }}
          />

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <CustomButton
              label="Cancel"
              variant="outlined"
              onClick={() => navigate("/dashboard/courses")}
            />
            <CustomButton
              label="Submit"
              type="submit"
              loading={isUpdating}
              sx={{
                width: 80,
              }}
            />
          </Stack>
        </Box>
      </form>
    </FormProvider>
  );
};

export default UpdateCurriculum;
