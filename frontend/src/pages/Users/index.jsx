import React, { useState, useEffect, useMemo } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import debounce from "lodash/debounce";
import { toast } from 'react-hot-toast';
import CustomTable from "../../components/CustomTable";
import CustomDropdown from "../../components/CustomDropdown";
import {
  useGetAllUsersQuery,
  useUpdateStatusMutation,
} from "../../services/usersApi";
import PersonAdd from "@mui/icons-material/PersonAdd";
import CustomButton from "../../components/CustomButton";
import AddNewUser from "./AddNewUser";
import DialogBoxWrapper from "../../components/DialogBoxWrapper";

const Users = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(2);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserModal, setAddUserModal] = useState(false);
  console.log("Statuse :", statusFilter);

  const { data, isLoading, isFetching, refetch } = useGetAllUsersQuery({
    page: page + 1,
    limit,
    query,
    active: statusFilter,
  });
  const [updateStatus] = useUpdateStatusMutation();

  console.log("Data :", data);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setQuery(value);
        setPage(0);
      }, 500),
    []
  );
  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search, debouncedSearch]);

  const handleActionClick = async (action, row) => {
    console.log("action and row: ", action, row._id);

    switch (action) {
      case "status":
        setSelectedUser(row);
        setOpenConfirmDialog(true);
        // alert(`Open update modal for ${row.name}`);
        break;
      case "delete":
        if (window.confirm(`Delete ${row.name}?`)) {
          await fetch(`http://localhost:5000/users/${row.id}`, {
            method: "DELETE",
          });
          refetch();
        }
        break;
      case "assign":
        alert(`Assign course to ${row.name}`);
        break;
      default:
        break;
    }
  };
  const handleStatusChange = async () => {
    if (!selectedUser) return;
    try {
      await updateStatus({ userId: selectedUser._id });
      toast.success(
        selectedUser.active
          ? `User ${selectedUser.name} has been deactivated!`
          : `User ${selectedUser.name} has been activated!`
      );
      setOpenConfirmDialog(false);
      refetch();
    } catch (error) {
      toast.error("Something went wrong!");
      setOpenConfirmDialog(false);
    }
  };
  const handleAddUser = () => {
    // alert("Add user")
    setAddUserModal(true);
  };
  const columns = [
    { id: "sno.", label: "S No." },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "coursesEnrolled", label: "CoursesEnrolled" },
    { id: "role", label: "Role" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="Search users"
          value={search}
          size="small"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
            Filter By:
          </Typography>
          <CustomDropdown
            label="Status"
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              setPage(0);
            }}
            options={[
              { label: "All", value: "All" },
              { label: "Active", value: true },
              { label: "Inactive", value: false },
            ]}
          />
          <CustomButton
            variant="outlined"
            label="Add User"
            // color="primary"
            startIcon={<PersonAdd />}
            onClick={handleAddUser}
            sx={{ whiteSpace: "nowrap" }}
          />
        </Box>
      </Box>
      <CustomTable
        columns={columns}
        rows={data?.data?.users || []}
        totalCount={data?.data?.totalDocs || 0}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onActionClick={handleActionClick}
        isLoading={isLoading || isFetching}
        cellHeight={40}
      />
      <AddNewUser open={addUserModal} onClose={() => setAddUserModal(false)} />
      <DialogBoxWrapper
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        onConfirm={handleStatusChange}
        title={`Confirm ${
          selectedUser?.active ? "Deactivation" : "Activation"
        }`}
        message={
          selectedUser?.active ? 
          `Are you sure you want to deactivate ${selectedUser?.name} account? After this user will no longer able to login or perform any action.` : 
          `Are you sure you want to activate ${selectedUser?.name}? After this user will be able to login or perform any action `}
      />
    </Box>
  );
};

export default Users;
