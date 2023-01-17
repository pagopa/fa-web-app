import { Box, Divider, Link, Stack, Typography, useTheme } from "@mui/material";

import { Item } from "../components/item";
import IcoWork from "../assets/ico-work.svg";
import IcoBuild from "../assets/ico-build.svg";
import IcoUser from "../assets/ico-user.svg";
import { useContext } from "react";
import { AppCxt } from "../commons/context";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const theme = useTheme();
  const appContext = useContext(AppCxt);
  const navigate = useNavigate();

  const activeUser = async () => {
    await window
      .fetch(import.meta.env.VITE_CSTAR_API + "/io/customer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${appContext?.bpdToken}`,
        },
        body: JSON.stringify({}),
      })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => {
        console.log("ONBOARDING_PUT_SUCCESS");
        navigate("/choose");
      })
      .catch((error) => {
        console.log("ONBOARDING_PUT_ERROR", error);
      });
  };

  return (
    <>
      <Typography variant="h4">Hai una Partita IVA?</Typography>
      <Typography variant="body2" py={2}>
        Potrai richiedere l’emissione automatica delle fatture sia per la tua
        attività professionale che per gli acquisti personali.
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 1,
          py: { xs: 1, md: 5 },
        }}
      >
        <Item
          title="Sì, ed è intestata a me"
          desc="Potrai chiedere fattura per gli acquisti legati alla tua attività professionale."
          badge="in arrivo"
          icon={IcoWork}
        ></Item>
        <Divider sx={{ my: 1 }}></Divider>
        <Item
          title="Sì, ma non è intestata a me"
          desc="La tua azienda dovrà confermare l’iscrizione prima di poter usare il servizio."
          badge="in arrivo"
          icon={IcoBuild}
        ></Item>
        <Divider sx={{ my: 1 }}></Divider>
        <Box onClick={activeUser} sx={{ cursor: "pointer" }}>
          <Item
            title="Non ho una partita IVA"
            desc="Potrai chiedere fattura per i tuoi acquisti personali, usando il tuo codice fiscale."
            icon={IcoUser}
            arrow={true}
          ></Item>
        </Box>
        <Divider sx={{ my: 1 }}></Divider>
        <Typography
          variant="subtitle2"
          color={theme.palette.text.secondary}
          fontWeight={400}
          mt={2}
        >
          Proseguendo accetti i{" "}
          <Link href="#" fontWeight={600}>
            Termini e condizioni d’uso
          </Link>{" "}
          del servizio e confermi di avere letto l’
          <Link href="#" fontWeight={600}>
            Informativa Privacy
          </Link>
          .
        </Typography>
      </Stack>
    </>
  );
}
