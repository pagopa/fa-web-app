import { Box, SxProps } from "@mui/system";
import { Container, Typography, useTheme } from "@mui/material";
interface LayoutProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export function Layout({ sx, children }: LayoutProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: "0 1 100vh",
        height: "100vh",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.grey[700],
          fontSize: "0.8rem",
          p: 2,
          textAlign: "center",
          m: 0,
        }}
      >
        Fatturazione Automatica
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 1,
          bgcolor: theme.palette.background.paper,
          py: 2,
          height: "100%",
        }}
      >
        <Container
          sx={{
            ...sx,
            p: { xs: 0 },
            pl: { xs: 2, sm: 6, md: 0 },
            pr: { xs: 2, sm: 6, md: 0 },
            flexGrow: 1,
          }}
          maxWidth={"xs"}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
