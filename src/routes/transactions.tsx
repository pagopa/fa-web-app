import {
  Alert,
  Divider,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppCxt } from "../commons/context";
import { Transaction } from "../components/transaction";

export default function Transactions() {
  const theme = useTheme();
  const appContext = useContext(AppCxt);
  const [transactionsList, setTransactionsList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState<null | string>(null);

  const friendlyDate = (date: string, long = true) => {
    const dateAsDate = new Date(date);
    return long
      ? Intl.DateTimeFormat("it-IT", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(dateAsDate)
      : Intl.DateTimeFormat("it-IT", {
          month: "long",
          year: "numeric",
        }).format(dateAsDate);
  };

  useEffect(() => {
    const getTransactions = async () => {
      await window
        .fetch(import.meta.env.VITE_CSTAR_API + "/io/transaction/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${appContext?.bpdToken}`,
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          setTransactionsList(data.transactionList);
          if (data.transactionList.length === 1) {
            setLastUpdate(data.transactionList[0].trxDate);
          } else if (data.transactionList > 1) {
            setLastUpdate(data.transactionList[-1].trxDate);
          }
          console.log("ONBOARDING_GET_SUCCESS");
        })
        .catch((error) => {
          console.log("ONBOARDING_GET_ERROR", error);
        });
    };

    getTransactions();
  }, []);

  return (
    <>
      <Alert variant="standard" severity="info">
        {lastUpdate && (
          <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
            Ultimo aggiornamento: <strong>{friendlyDate(lastUpdate)}</strong>
          </Typography>
        )}
      </Alert>
      {lastUpdate && (
        <Typography
          variant="subtitle1"
          sx={{ mb: 2, mt: 4, textTransform: "capitalize" }}
        >
          {friendlyDate(lastUpdate, false)}
        </Typography>
      )}
      {transactionsList.map((transaction, i) => {
        return <Transaction transactionData={transaction} key={i} />;
      })}
    </>
  );
}
