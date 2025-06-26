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

      setEnquiries((prev) =>
        prev.map((e) =>
          e._id === enquiryId
            ? {
                ...e,
                currentStatus: newStatus,
                updatedAt: new Date().toISOString(),
                statusLogs: res.data.statusLogs,
              }
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
              <TableCell sx={{ fontWeight: 600, width: 80 }}>S. No.</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 150 }}>
                Ticket No
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 140 }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 120 }}>
                Status
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, minWidth: 80 }}>
                View
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
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{enquiry.ticketNo}</TableCell>
                  <TableCell>{enquiry.name}</TableCell>
                  <TableCell sx={{ width: 100 }}>
                    <Select
                      size="small"
                      value={enquiry.currentStatus}
                      onChange={(e) => {
                        const selectedStatus = e.target.value;
                        if (selectedStatus !== enquiry.currentStatus) {
                          handleStatusChange(enquiry._id, selectedStatus);
                        }
                      }}
                      fullWidth
                    >
                      <MenuItem value={enquiry.currentStatus} disabled>
                        {enquiry.currentStatus}
                      </MenuItem>
                      {Object.entries(EnquiryStatus)
                        .filter(([_, label]) => label !== enquiry.currentStatus)
                        .map(([key, label]) => (
                          <MenuItem key={key} value={label}>
                            {label}
                          </MenuItem>
                        ))}
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Show Details">
                      <IconButton
                        onClick={() => {
                          setSelectedEnquiry(enquiry);
                          setShowDetails(true);
                        }}
                        color="primary"
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
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
                Interested Course: {selectedEnquiry.interestedCourse}
              </Typography>
              <Typography>
                Current Status: {selectedEnquiry.currentStatus}
              </Typography>
              <Typography>
                Created At:{" "}
                {new Date(selectedEnquiry.createdAt).toLocaleDateString()}
              </Typography>
              <Typography>Ticket No: {selectedEnquiry.ticketNo}</Typography>

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
                              log.status === "Pending"
                                ? "#2196f3"
                                : log.status === "First Call Attempted"
                                ? "#ff9800"
                                : log.status === "Closed"
                                ? "#d32f2f"
                                : "#4caf50",
                            position: "absolute",
                            left: -22,
                            top: 5,
                          }}
                        />

                        {/* Timestamp */}
                        <Typography variant="caption" color="textSecondary">
                          {new Date(log.timeStamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          - {new Date(log.timeStamp).toLocaleDateString()}
                        </Typography>

                        {/* Status label */}
                        <Typography variant="body2" fontWeight="bold">
                          {EnquiryStatus[log.status.toUpperCase()] ||
                            log.status}
                        </Typography>

                        {/* Optional: updatedBy */}
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
