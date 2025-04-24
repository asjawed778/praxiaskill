import React, { useState } from "react";
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  IconButton, TablePagination, Menu, MenuItem, Paper,
  CircularProgress, Box, Typography,
  TableContainer
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppTheme } from "../context/ThemeContext"

export default function CustomTable({
  columns,
  rows,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onActionClick,
  cellHeight = 20,
  isLoading,
}) {
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
    onActionClick(action, selectedRow);
    handleCloseMenu();
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f0f0f0", }}>
            {columns.map((col) => (
              <TableCell key={col.id} sx={{py: 1.5, fontWeight: 600}} >{col.label}</TableCell>
            ))}
            <TableCell sx={{fontWeight: 600}}>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Box display="flex" justifyContent="center" py={4}>
                  <CircularProgress />
                </Box>
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1}>
                <Box display="flex" justifyContent="center" py={4}>
                  <Typography variant="subtitle1" color="textSecondary">
                    No results found.
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow key={row.id} sx={{
                
                '& td': {
                  py: 0,
                  fontSize: '0.85rem',
                },
              }}>
                {/* <TableCell sx={{ py: 0, fontSize: "0.75rem", lineHeight: 1 }}>
    {index + 1 + page * rowsPerPage}
  </TableCell> */}
                {columns.map((col) => (
                //   <TableCell key={col.id}>{row[col.id]}</TableCell>
                  <TableCell key={col.id}  sx={{py: 0, fontSize: "0.85rem", }}> {col.id === 'sno.'
                    ? index + 1 + page * rowsPerPage 
                    : row[col.id]}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={(e) => handleOpenMenu(e, row)} sx={{color: colors.secondary}}>
                    <MoreVertIcon />
                  </IconButton>
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
        onPageChange={(e, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 15]}
      />

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleCloseMenu}>
        <MenuItem onClick={() => handleAction("update")}> Update</MenuItem>
        <MenuItem onClick={() => handleAction("delete")}> Delete</MenuItem>
        <MenuItem onClick={() => handleAction("assign")}> Assign Course</MenuItem>
      </Menu>
    </TableContainer>
  );
}
