import { Box, SxProps } from "@mui/system";
import { Chip, Container, Typography, useTheme } from "@mui/material";
import { Scale } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ItemProps {
  sx?: SxProps;
  title: string;
  icon?: string;
  desc: string;
  badge?: string;
  arrow?: boolean;
}

export function Item({ sx, title, icon, desc, badge, arrow }: ItemProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {icon && (
        <Box sx={{ p: 3 }}>
          <img src={icon} />
        </Box>
      )}
      <Box>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography
          variant="subtitle2"
          color={theme.palette.text.secondary}
          fontWeight={400}
        >
          {desc}
        </Typography>
      </Box>
      <Box flexShrink={0} display="flex" alignItems="center">
        {badge && (
          <Chip
            label={badge}
            color="primary"
            size="small"
            sx={{ transform: "scale(0.7)" }}
          />
        )}
        {arrow && (
          <ArrowForwardIosIcon
            sx={{ mx: 1 }}
            color="primary"
          ></ArrowForwardIosIcon>
        )}
      </Box>
    </Box>
  );
}
