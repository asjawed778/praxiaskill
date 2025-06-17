// export default function CourseSkeleton() {
//   return (
//     <div className="flex gap-5 p-5 overflow-hidden">
//       <div className="flex flex-col gap-5 mx-auto">
//         <div className="w-64 h-40 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//       </div>

//       <div className="flex flex-col gap-5 mx-auto">
//         <div className="w-64 h-40 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//       </div>

//       <div className="flex flex-col gap-5 mx-auto">
//         <div className="w-64 h-40 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//       </div>

//       <div className="flex flex-col gap-5 mx-auto">
//         <div className="w-64 h-40 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//         <div className="w-64 h-5 bg-gray-300 rounded-xl animate-pulse" />
//       </div>
//     </div>
//   );
// }

import React from "react";
import {
  Box,
  Skeleton,
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

export default function CourseSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: { xs: "auto", md: "visible" },
        px: { xs: 2, md: 0 },
        pb: 2,
      }}
    >
      {[...Array(4)].map((_, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 280,
            maxWidth: 280,
            flexShrink: 0,
            borderRadius: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Image Skeleton */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={150}
            animation="wave"
          />

          <CardContent>
            {/* Tag */}
            <Skeleton
              variant="rounded"
              width={100}
              height={24}
              sx={{ mb: 1 }}
              animation="wave"
            />

            {/* Title */}
            <Skeleton variant="text" width="80%" height={28} animation="wave" />

            {/* Description */}
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              animation="wave"
            />
            <Skeleton variant="text" width="90%" height={20} animation="wave" />

            {/* Highlights */}
            <Skeleton
              variant="text"
              width="60%"
              height={18}
              animation="wave"
              sx={{ mt: 1 }}
            />
          </CardContent>

          <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
            <Skeleton
              variant="rounded"
              width={100}
              height={36}
              animation="wave"
            />
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}
