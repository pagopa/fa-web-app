import { Box, Button, TextField, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppCxt } from "../commons/context";

export default function Root() {
  const theme = useTheme();
  const appContext = useContext(AppCxt);
  const navigate = useNavigate();

  useEffect(() => {
    appContext?.bpdToken !== "" && callCustomerService();
  }, [appContext]);

  const callCustomerService = () => {
    window
      .fetch(import.meta.env.VITE_CSTAR_API + "/io/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appContext?.bpdToken}`,
        },
      })
      .then((response) => {
        if (!response.ok && response.status === 404) {
          navigate("/onboarding");
        } else if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("ONBOARDING_GET_SUCCESS");
        if (data.enabled === true) {
          navigate("/transactions");
        } else {
          navigate("/onboarding");
        }
      })
      .catch((error) => {
        console.log("ONBOARDING_GET_ERROR", error);
      });
  };

  const spidSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const spidInput =
      (document.getElementById("spidInput") as HTMLInputElement).value || "";

    window
      .fetch(import.meta.env.VITE_CSTAR_API + "/proxy/io/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${spidInput}`,
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        } else if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("SESSION_GET_SUCCESS");
        appContext?.setSpidToken(spidInput);
        appContext?.setBpdToken(data.bpdToken);
        appContext?.setWalletToken(data.walletToken);
        // callCustomerService(data.bpdToken);
      })
      .catch((error) => {
        console.log("SESSION_GET_ERROR", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 1,
      }}
    >
      <form onSubmit={spidSubmitForm}>
        <TextField
          id="spidInput"
          label="Inserisci token SPID"
          variant="outlined"
          sx={{ m: 1, width: 1 }}
        />
        <Button
          variant="contained"
          size="small"
          sx={{ m: 1, width: 1 }}
          type="submit"
        >
          Continua
        </Button>
      </form>
    </Box>
  );
}
