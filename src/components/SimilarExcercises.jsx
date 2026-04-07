import { Box, Typography, Stack } from "@mui/material";
import React from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Loader from "./Loader";

const SimilarExcercises = ({ targetMuscleExcercises, equipmentExcercises }) => {
  return (
    <Box sx={{ mt: { lg: "100ox", xs: "0" } }}>
      <Typography variant="h3" mb={5}>
        Excercises that target the same muscle group
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {targetMuscleExcercises.length ? (
          <HorizontalScrollbar data={targetMuscleExcercises} />
        ) : (
          <Loader />
        )}
      </Stack>
      <Typography variant="h3" mb={5}>
        Excercises that use the same equipment
      </Typography>
      <Stack direction="row" sx={{ p: "2", position: "relative" }}>
        {equipmentExcercises.length ? (
          <HorizontalScrollbar data={equipmentExcercises} />
        ) : (
          <Loader />
        )}
      </Stack>
    </Box>
  );
};

export default SimilarExcercises;
