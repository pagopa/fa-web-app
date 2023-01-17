import { Box, SxProps } from "@mui/system";
import { Chip, Skeleton, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppCxt } from "../commons/context";

interface TransactionProps {
  sx?: SxProps;
  transactionData: any;
}
interface Status {
  label: string;
  color: "primary" | "success" | "error";
  variant: "filled" | "outlined";
}

const statusView: Record<number, Status> = {
  0: {
    label: "Annullata",
    color: "error",
    variant: "outlined",
  },
  1: {
    label: "Emessa",
    color: "success",
    variant: "filled",
  },
  2: {
    label: "In corso",
    color: "primary",
    variant: "filled",
  },
};

export function Transaction({ sx, transactionData }: TransactionProps) {
  const theme = useTheme();
  const appContext = useContext(AppCxt);
  const [merchantName, setMerchantName] = useState<null | string>(null);
  const transactionBadge = statusView[transactionData.status] || undefined;
  const trxDate = new Date(transactionData.trxDate);

  useEffect(() => {
    const getTransactions = async () => {
      await window
        .fetch(
          import.meta.env.VITE_CSTAR_API +
            "/io/merchant/shop/" +
            transactionData.merchantId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${appContext?.bpdToken}`,
            },
          }
        )
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          setMerchantName(data.companyName);
          console.log("MERCHANT_GET_SUCCESS");
        })
        .catch((error) => {
          setMerchantName(`Merchant ${transactionData.merchantId}`);
          console.log("MERCHANT_GET_ERROR", error);
        });
    };

    getTransactions();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottom: 1,
        borderBottomColor: theme.palette.grey[200],
        py: 1,
      }}
    >
      <Box>
        {merchantName ? (
          <Typography variant="subtitle1" sx={{ fontSize: "1rem" }}>
            {merchantName}
          </Typography>
        ) : (
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        )}
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 400, color: theme.palette.grey[700] }}
        >
          &euro;{" "}
          {Intl.NumberFormat("it-IT", {
            minimumFractionDigits: 2,
          }).format(transactionData.amount / 100)}
          &nbsp;&middot;&nbsp;
          {Intl.DateTimeFormat("it-IT", {
            dateStyle: "full",
            timeStyle: "short",
          }).format(trxDate)}
        </Typography>
      </Box>
      {transactionBadge && (
        <Chip
          color={transactionBadge.color}
          label={transactionBadge.label}
          size="small"
          variant={transactionBadge.variant}
          sx={{ ml: "auto", transform: "scale(0.85)" }}
        />
      )}
    </Box>
  );
}
