import React from "react";
import {
  Box,
  Pagination,
  Stack,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const CoursePagination= ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const isSmall = useMediaQuery("(max-width:600px)");

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Box mt={5} display="flex" justifyContent="center" flexWrap="wrap">
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
        {/* Prev Button */}
        <IconButton onClick={handlePrev} disabled={currentPage === 1}>
          <ArrowBackIos fontSize="small" />
        </IconButton>

        {/* Page Text */}
        {!isSmall && (
          <Typography variant="body1" sx={{ minWidth: "80px", textAlign: "center" }}>
            Page {currentPage} of {totalPages}
          </Typography>
        )}

        {/* Pagination */}
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          siblingCount={1}
          boundaryCount={1}
          color="primary"
          shape="rounded"
          size={isSmall ? "small" : "medium"}
          hideNextButton
          hidePrevButton
        />

        {/* Next Button */}
        <IconButton onClick={handleNext} disabled={currentPage === totalPages}>
          <ArrowForwardIos fontSize="small" />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default CoursePagination;
