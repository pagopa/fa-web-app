import { Box, Typography, useTheme } from "@mui/material";

import { IllusCompleted } from "@pagopa/mui-italia";
import { Link } from "react-router-dom";

export default function Response() {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Link to="/">
          <IllusCompleted />
        </Link>
        <Typography variant="h4" my={3}>
          Grazie!
        </Typography>
        <Typography variant="body2" mx={4} px={3} textAlign="center">
          Da domani potrai utilizzare il servizio Fatturazione Automatica.
        </Typography>
        <Box p={3} mt={3} />
      </Box>
    </>
  );
}
