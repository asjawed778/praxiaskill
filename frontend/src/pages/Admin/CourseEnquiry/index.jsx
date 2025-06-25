import { useState } from "react";
import { Box, } from "@mui/material";

import {
  useGetAllEnquiryQuery,
} from "@/services/course.api";
import CustomDropdownField from "@/components/CustomDropdownField";
import CustomSearchField from "@/components/CustomSearchField";

import { EnquiryStatus } from "../../../utils/enum";
import EnquiryTable from "./EnquiryTable";

const CourseEnquiry = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const { data, isLoading, isFetching, refetch, isError } =
    useGetAllEnquiryQuery({
      page: page + 1,
      limit,
      status: statusFilter,
      search: searchQuery,
      sortBy: sortOrder,
    });
  console.log("Enquiry: ", data);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0);
  };

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
        <CustomSearchField label="Search" onSearch={setSearchQuery} />
        <CustomDropdownField
          label="Status"
          value={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            setPage(0);
          }}
          required={false}
          options={[
            ...Object.entries(EnquiryStatus).map(([key, label]) => ({
              label,
              value: key,
            })),
          ]}
        />

        <CustomDropdownField
          label="Sort by"
          value={sortOrder}
          onChange={(val) => setSortOrder(val)}
          required={false}
          options={[
            { label: "None", value: "" },
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
          ]}
        />
      </Box>
      <EnquiryTable
        enquiries={data?.data?.enquiries}
        // refetch={refetch}
        isLoading={isLoading || isFetching}
        isError={isError}
        totalCount={data?.data?.totalEnquiries || 0}
        page={page}
        rowsPerPage={limit}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default CourseEnquiry;
