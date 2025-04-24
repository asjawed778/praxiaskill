import React, { useState, useEffect, useMemo } from "react";
import { Box, TextField } from "@mui/material";
import debounce from 'lodash/debounce';
import { useGetUsersQuery } from "../../services/usersApi";
import CustomTable from "../../components/CustomTable";
import { fetchMockUsers } from "../../data";

const Users = () => {
  const [page, setPage] = useState(0); // MUI uses 0-based index
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [data, setData] = useState({ users: [], total: 0 });

//   const { data, isLoading, isFetching, refetch } = useGetUsersQuery({
//     page: page + 1, 
//     limit,
//     query
//   });

useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMockUsers({ page: page + 1, limit, query }); // +1 because mock API uses 1-based index
      setData(result); // Store the result in state
    };
    fetchData();
  }, [page, limit, query]);
  console.log("Data :", data);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0); 
  };

  // Debounced search
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
    switch (action) {
      case "update":
        alert(`Open update modal for ${row.name}`);
        break;
      case "delete":
        if (window.confirm(`Delete ${row.name}?`)) {
          await fetch(`http://localhost:5000/users/${row.id}`, {
            method: "DELETE",
          });
          refetch(); // refresh after delete
        }
        break;
      case "assign":
        alert(`Assign course to ${row.name}`);
        break;
      default:
        break;
    }
  };

  const columns = [
    {id: "sno.", label: "S No."},
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "coursesEnrolled", label: "CoursesEnrolled" },
    {id: "role", label: "Role"}
  ];

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Search users"
        value={search}
        size="small"
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <CustomTable
        columns={columns}
        rows={data?.users || []}
        totalCount={data?.total || 0}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        // onPageChange={(newPage) => setPage(newPage)}
        onActionClick={handleActionClick}
        // isLoading={isLoading || isFetching}
        isloading={false}
        cellHeight={40}
      />
    </Box>
  );
};

export default Users;