import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

export const Loading: React.FunctionComponent = () => {
  return (
    <Box display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
};

export default Loading;
