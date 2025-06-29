import { Box, Typography } from "@mui/material";
import ModalWrapper from "@/components/ModalWrapper"
import { EnquiryStatus } from "../../../utils/enum";

export const statusColorMap = {
  [EnquiryStatus.PENDING]: "#1976d2",              // Blue
  [EnquiryStatus.FIRST_CALL_ATTEMPTED]: "#ff9800", // Orange
  [EnquiryStatus.INTERESTED]: "#43a047",           // Green
  [EnquiryStatus.INFORMATION_SENT]: "#00acc1",     // Cyan
  [EnquiryStatus.NOT_ENGAGE]: "#9e9e9e",           // Grey
  [EnquiryStatus.COURSE_FEE_ISSUE]: "#e53935",     // Red
  [EnquiryStatus.CLOSED]: "#6d4c41",               // Brown
};

const ShowStatusLogs = ({ open, onClose, selectedEnquiry }) => {
  return (
    <ModalWrapper open={open} onClose={onClose} title="Enquiry Details">
      <>
        <Typography>Name: {selectedEnquiry.name}</Typography>
        <Typography>Phone: {selectedEnquiry.phone}</Typography>
        <Typography>Email: {selectedEnquiry.email}</Typography>
        <Typography>
          Interested Course: {selectedEnquiry.interestedCourse}
        </Typography>
        <Typography>Current Status: {selectedEnquiry.currentStatus}</Typography>
        <Typography>
          Created At: {new Date(selectedEnquiry.createdAt).toLocaleDateString()}
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
                      backgroundColor: statusColorMap[log.status] || "#4caf50",
                      position: "absolute",
                      left: -22,
                      top: 5,
                    }}
                  />
                  <Typography variant="caption" color="textSecondary">
                    {new Date(log.timeStamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    - {new Date(log.timeStamp).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {EnquiryStatus[log.status.toUpperCase()] || log.status}
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
      </>
    </ModalWrapper>
  );
};

export default ShowStatusLogs;
