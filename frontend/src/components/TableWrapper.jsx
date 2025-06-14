// import React, { useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   TablePagination,
//   Menu,
//   MenuItem,
//   Paper,
//   CircularProgress,
//   Box,
//   Typography,
//   TableContainer,
// } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { useAppTheme } from "../context/ThemeContext";

// export default function TableWrapper({
//   columns,
//   rows,
//   totalCount,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   onActionClick,
//   isLoading,
// }) {
  
//   const { colors } = useAppTheme();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const handleOpenMenu = (event, row) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedRow(row);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//     setSelectedRow(null);
//   };

//   const handleAction = (action) => {
//     onActionClick(action, selectedRow);
//     handleCloseMenu();
//   };
//   return (
//     <TableContainer component={Paper}>
//       <Table size="small">
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
//             {columns.map((col) => (
//               <TableCell key={col.id} sx={{ py: 1.5, fontWeight: 600 }}>
//                 {col.label}
//               </TableCell>
//             ))}
//             <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {isLoading ? (
//             <TableRow>
//               <TableCell colSpan={columns.length + 1}>
//                 <Box display="flex" justifyContent="center" py={4}>
//                   <CircularProgress />
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ) : rows.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={columns.length + 1}>
//                 <Box display="flex" justifyContent="center" py={4}>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     No results found.
//                   </Typography>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ) : (
//             rows.map((row, index) => (
//               <TableRow
//                 key={row.id || index}
//                 sx={{
//                   "& td": {
//                     py: 0,
//                     fontSize: "0.85rem",
//                   },
//                 }}
//               >
//                 {columns.map((col) => (
//                   <TableCell
//                     key={col.id || col.label}
//                     sx={{ py: 0, fontSize: "0.85rem" }}
//                   >
//                     {" "}
//                     {col.id === "sno."
//                       ? index + 1 + page * rowsPerPage
//                       : row[col.id] || 0}
//                   </TableCell>
//                 ))}
//                 <TableCell>
//                   <IconButton
//                     onClick={(e) => handleOpenMenu(e, row)}
//                     sx={{ color: colors.secondary }}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>

//       <TablePagination
//         component="div"
//         count={totalCount}
//         page={page}
//         onPageChange={(e, newPage) => onPageChange(newPage)}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={(e) =>
//           onRowsPerPageChange(parseInt(e.target.value, 10))
//         }
//         rowsPerPageOptions={[5, 10, 15]}
//       />

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleCloseMenu}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem
//           onClick={() => handleAction("status")}
//           sx={{
//             color: selectedRow?.active ? "error.main" : "success.main",
//             fontWeight: 500,
//           }}
//         >
//           {selectedRow?.active ? "Deactivate" : "Activate"}
//         </MenuItem>
//         <MenuItem onClick={() => handleAction("assign")}>
//           Assign Course
//         </MenuItem>
//         {/* <MenuItem onClick={() => handleAction("track")}>
//           Track Progress
//         </MenuItem> */}
//         <MenuItem onClick={() => handleAction("updateUserDetails")}>
//           Update User Details
//         </MenuItem>
//       </Menu>
//     </TableContainer>
//   );
// }


import React, { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Menu,
  MenuItem,
  Paper,
  CircularProgress,
  Box,
  Typography,
  TableContainer,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppTheme } from "../context/ThemeContext";

const TableWrapper = ({
  columns,
  rows,
  totalCount = 0,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  onActionClick,
  isLoading = false,
  isError = false,
  actionsList,
}) => {
  const { colors } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenMenu = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAction = (action) => {
    onActionClick?.(action, selectedRow);
    handleCloseMenu();
  };

  const renderedRows = useMemo(() => {
    return rows.map((row, index) => (
      <TableRow
        key={row.id ?? index}
        sx={{
          "& td": { py: 0, fontSize: "0.85rem" },
        }}
      >
        {columns.map((col) => (
          <TableCell key={col.key} align={col.align || "left"}>
            {col.key === "sno."
              ? index + 1 + page * rowsPerPage
              : row[col.key] !== undefined && row[col.key] !== null
              ? row[col.key]
              : "N/A"}
          </TableCell>
        ))}
        {actionsList && (
          <TableCell>
            <IconButton
              aria-label="row actions"
              aria-controls={anchorEl ? "actions-menu" : undefined}
              aria-haspopup="true"
              onClick={(e) => handleOpenMenu(e, row)}
              sx={{ color: colors.primary }}
            >
              <MoreVertIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    ));
  }, [rows, columns, actionsList, page, rowsPerPage, colors.primary, anchorEl]);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                sx={{ py: 1.5, fontWeight: 600 }}
                align={col.align || "left"}
              >
                {col.label}
              </TableCell>
            ))}
            {actionsList && (
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {isError ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actionsList ? 1 : 0)}>
                <Box display="flex" justifyContent="center" py={4}>
                  <Typography variant="subtitle1" color="error">
                    Something went wrong. Please check your internet connection.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actionsList ? 1 : 0)}>
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actionsList ? 1 : 0)}>
                <Box display="flex" justifyContent="center" py={4}>
                  <Typography variant="subtitle1" color="text.secondary">
                    No records found.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            renderedRows
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
      />

      {actionsList && (
        <Menu
          id="actions-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {actionsList.map((list, index) => (
            <MenuItem key={index} onClick={() => handleAction(list.action)}>
              {list.label}
            </MenuItem>
          ))}
        </Menu>
      )}
    </TableContainer>
  );
};

export default TableWrapper;
