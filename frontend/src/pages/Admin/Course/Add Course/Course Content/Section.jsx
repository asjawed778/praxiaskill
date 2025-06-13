// import React from 'react'
// import InputField from '../../../../../components/Input Field'
// import VideoUploader from './Video'

// const Section = ({courseId, section, courseTitle, index}) => {
//   return (
//     <div
//             className="flex flex-col gap-4 bg-[#F5F5F5] p-4 rounded-md"
//           >
//             <div className="text-lg font-semibold">Section {index + 1}</div>
//             <div className="flex flex-col gap-3">
//               <div className="flex flex-col gap-1">
//                 <p>Title</p>
//                 <p className="bg-white py-2 px-4 rounded-md border border-neutral-300">
//                   {section?.title}
//                 </p>
//               </div>
//               <div className="flex flex-col gap-1">
//                 <p>Description</p>
//                 <p className="bg-white py-2 px-4 rounded-md border border-neutral-300">
//                   {section?.description}
//                 </p>
//               </div>

//               <div className="flex flex-col gap-3">
//                 <p>Subsections</p>
//                 {section?.subSections.map((subSection, index) => (
//                   <div
//                     key={index}
//                     className="relative flex flex-col gap-5 border border-neutral-300 p-4 rounded-md"
//                   >
//                     <p className="bg-white py-2 px-4 mt-2 rounded-md border border-neutral-300">
//                       {subSection?.title}
//                     </p>
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                       <div>
//                         <InputField disabled id="step4-image" type="image">
//                           Content Image
//                         </InputField>
//                       </div>

//                       <div>
//                         <InputField disabled id="step4-pdf" type="pdf">
//                           Content Brochure pdf
//                         </InputField>
//                       </div>

//                       <div className="">
//                         <VideoUploader
//                           courseId={courseId}
//                           sectionId={section?._id}
//                           subSectionId={subSection?._id}
//                           courseTitle={courseTitle}
//                           video={subSection?.video}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//   )
// }

// export default Section

import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
  Paper,
  Tooltip,
  IconButton,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputField from "../../../../../components/Input Field";
import VideoUploader from "./Video";
import { Image, UploadFile } from "@mui/icons-material";

const Section = ({ courseId, section, courseTitle, index }) => {
  const [expanded, setExpanded] = useState(index === 0); // only first open

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>
          <Box component="span" sx={{ fontWeight: "bold" }}>
            Module {index + 1}:
          </Box>{" "}
          {section?.title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box display="flex" flexDirection="column" gap={1}>
          {/* Title */}
          {/* <Box>
            <Typography variant="subtitle2">Title</Typography>
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1,
                mt: 0.5,
                bgcolor: "background.paper",
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            >
              {section?.title}
            </Paper>
          </Box> */}

          {/* Description */}
          {/* <Box>
            <Typography variant="subtitle2">Description</Typography>
            <Paper
              elevation={0}
              sx={{
                px: 2,
                py: 1,
                mt: 0.5,
                bgcolor: "background.paper",
                border: "1px solid #ccc",
                borderRadius: 1,
              }}
            >
              {section?.description}
            </Paper>
          </Box> */}

          {/* Subsections */}
          <Box>
            {/* <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Subsections
            </Typography> */}

            {section?.subSections?.map((subSection, subIndex) => (
              <Box
                key={subIndex}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {/* <Paper
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: "background.paper",
                    border: "1px solid #ccc",
                    borderRadius: 1,
                  }}
                > */}
                <Typography>
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    Subsection {subIndex + 1}:
                  </Box>{" "}
                  {subSection?.title}
                </Typography>
                <Divider />
                
                {/* </Paper> */}

                <Grid
                  container
                  spacing={2}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Grid item xs={12} md={6} lg={4}>
                    {/* <InputField disabled id="step4-image" type="image">
                      Content Image
                    </InputField> */}
                    <Tooltip title="Upload Image">
                      <Typography variant="subtitle2" gutterBottom>
                        Content Image
                      </Typography>
                      <IconButton
                        color="primary"
                        component="label"
                        sx={{
                          border: "1px dashed #ccc",
                          width: 48,
                          height: 48,
                        }}
                        // htmlFor={uniqueInputId}
                      >
                        {/* <AiOutlineCloudUpload size={24} /> */}
                        <Image />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    {/* <InputField disabled id="step4-pdf" type="pdf">
                      Content Brochure PDF
                    </InputField> */}
                    <Tooltip title="Upload Brochure">
                      <Typography variant="subtitle2" gutterBottom>
                        Content Brochure PDF
                      </Typography>
                      <IconButton
                        color="primary"
                        component="label"
                        sx={{
                          border: "1px dashed #ccc",
                          width: 48,
                          height: 48,
                        }}
                        // htmlFor={uniqueInputId}
                      >
                        {/* <AiOutlineCloudUpload size={24} /> */}
                        <UploadFile />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={12} md={12} lg={4}>
                    <VideoUploader
                      courseId={courseId}
                      sectionId={section?._id}
                      subSectionId={subSection?._id}
                      courseTitle={courseTitle}
                      video={subSection?.video}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Section;
