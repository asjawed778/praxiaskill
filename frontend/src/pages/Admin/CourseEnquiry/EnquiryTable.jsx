import React, { useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  Typography,
  Select,
  MenuItem,
  TablePagination,
  TableFooter,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { EnquiryStatus } from "@/utils/enum";
import CustomButton from "@/components/CustomButton";
import { useSetEnquiryStatusMutation } from "../../../services/course.api";

const EnquiryTable = ({
  enquiries,
  setEnquiries,
  isLoading,
  isError,
  totalCount = 0,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [updateEnquiryStatus] = useSetEnquiryStatusMutation();

  
  const handleStatusChange = async (enquiryId, newStatus) => {
    try {
      const res = await updateEnquiryStatus({
        data: { status: newStatus },
        enquiryId,
      }).unwrap();

      toast.success(`Status updated to ${newStatus}`);
      setEnquiries((prev) =>
        prev.map((e) =>
          e._id === enquiryId
            ? { ...e, status: newStatus, updatedAt: new Date().toISOString() }
            : e
        )
      );
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
              <TableCell
                sx={{ fontWeight: 600, width: 80, whiteSpace: "nowrap" }}
              >
                S. No.
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 140 }}>
                Phone
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, minWidth: 80 }}>
                View
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="error">
                    Failed to load enquiries.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : enquiries?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No enquiries found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              enquiries.map((enquiry, index) => (
                <TableRow key={enquiry._id}>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{enquiry.name}</TableCell>
                  <TableCell>{enquiry.phone}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Show Details">
                      <IconButton
                        onClick={() => {
                          setSelectedEnquiry({
                            ...enquiry,
                            statusLogs: [
                              {
                                status: "PENDING",
                                date: "2024-06-21T10:12:34.123Z",
                              },
                              {
                                status: "FIRST_CALL_ATTEMPTED",
                                date: "2024-06-22T09:15:22.456Z",
                              },
                              {
                                status: "INTERESTED",
                                date: "2024-06-23T14:05:02.111Z",
                              },
                            ],
                          });
                          setShowDetails(true);
                        }}
                        color="primary"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Select
                      size="small"
                      value={enquiry.status}
                      onChange={(e) =>
                        handleStatusChange(enquiry._id, e.target.value)
                      }
                      fullWidth
                    >
                      {Object.entries(EnquiryStatus).map(([key, label]) => (
                        <MenuItem key={key} value={label}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => onPageChange?.(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) =>
            onRowsPerPageChange?.(parseInt(e.target.value, 10))
          }
          rowsPerPageOptions={[10, 25, 50]}
          colSpan={5}
        />
      </TableContainer>
      <Dialog open={showDetails} onClose={() => setShowDetails(false)}>
        <Box p={3} minWidth={400}>
          <Typography variant="h6" gutterBottom>
            Enquiry Details
          </Typography>

          {selectedEnquiry && (
            <>
              <Typography>Name: {selectedEnquiry.name}</Typography>
              <Typography>Phone: {selectedEnquiry.phone}</Typography>
              <Typography>Email: {selectedEnquiry.email}</Typography>
              <Typography>
                Course: {selectedEnquiry.interestedCourse}
              </Typography>
              <Typography>Status: {selectedEnquiry.status}</Typography>
              <Typography>
                Date: {new Date(selectedEnquiry.updatedAt).toLocaleDateString()}
              </Typography>

              {selectedEnquiry.statusLogs?.length > 0 && (
                <Box mt={4}>
                  <Typography fontWeight="bold" gutterBottom>
                    Status Change Logs:
                  </Typography>
                  <Box
                    sx={{
                      borderLeft: "2px solid #ccc",
                      ml: 2,
                      pl: 2,
                      position: "relative",
                    }}
                  >
                    {selectedEnquiry.statusLogs.map((log, index) => (
                      <Box key={index} sx={{ position: "relative", mb: 3 }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor:
                              log.status === "PENDING"
                                ? "#2196f3"
                                : log.status === "INTERESTED"
                                ? "#ff9800"
                                : "#4caf50",
                            position: "absolute",
                            left: -22,
                            top: 5,
                          }}
                        />
                        <Typography variant="caption" color="textSecondary">
                          {new Date(log.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          - {new Date(log.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          {EnquiryStatus[log.status] || log.status}
                        </Typography>
                        {log.updatedBy && (
                          <Typography variant="caption" color="textSecondary">
                            Updated by: {log.updatedBy}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

              <Box mt={3} display="flex" justifyContent="flex-end">
                <CustomButton
                  onClick={() => setShowDetails(false)}
                  label="Close"
                  variant="outlined"
                />
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
};

export default EnquiryTable;
