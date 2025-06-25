import { useEffect, useState } from "react";
import { Box } from "@mui/material";

import { useGetAllEnquiryQuery } from "@/services/course.api";
import CustomDropdownField from "@/components/CustomDropdownField";
import CustomSearchField from "@/components/CustomSearchField";

import { EnquiryStatus } from "../../../utils/enum";
import EnquiryTable from "./EnquiryTable";
import CustomButton from "../../../components/CustomButton";

const CourseEnquiry = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [enquiries, setEnquiries] = useState([]);

  const { data, isLoading, isFetching, refetch, isError } =
    useGetAllEnquiryQuery({
      page: page + 1,
      limit,
      status: statusFilter,
      search: searchQuery,
      sortBy: sortOrder,
    });
  useEffect(() => {
    if (data?.data?.enquiries) {
      setEnquiries(data.data.enquiries);
    }
  }, [data]);
  console.log("Enquiry: ", enquiries);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newLimit) => {
    setLimit(newLimit);
    setPage(0);
  };
  const handleClearFilter = () => {
    setSearchQuery("");
    setStatusFilter("");
    setSortOrder("");
  }

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
        {/* <Box > */}
          <CustomSearchField
          value={searchQuery} 
            label="Search" 
            onSearch={setSearchQuery} 
          />
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
              value: label,
            })),
          ]}
        />
        {/* </Box> */}

        {/* <Box> */}
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
        <CustomButton 
          label="Clear Filter"
          variant="outlined"
          onClick={handleClearFilter}
        />
        {/* </Box> */}
      </Box>

      <EnquiryTable
        enquiries={enquiries}
        setEnquiries={setEnquiries}
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
