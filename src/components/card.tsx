import { Box, SxProps } from "@mui/system";
import {
  Chip,
  Container,
  Link,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { Info } from "@mui/icons-material";
import { red } from "@mui/material/colors";

interface CardProps {
  sx?: SxProps;
  cardData: any;
}

export function Card({ sx, cardData }: CardProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottom: 1,
        borderBottomColor: theme.palette.grey[200],
      }}
    >
      <img src={cardData.info.brandLogo} height="16" />
      <Typography variant="subtitle2" py={2} mx={1}>
        •••• {cardData.info.blurredNumber}
      </Typography>
      <Switch
        color="primary"
        value={cardData.info.hashPan}
        sx={{
          ml: "auto",
          "& .MuiSwitch-thumb": {
            boxShadow: `0 0 4px ${theme.palette.grey[600]}`,
          },
        }}
      />
    </Box>
  );
}
