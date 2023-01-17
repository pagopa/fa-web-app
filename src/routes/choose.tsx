import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { Card } from "../components/card";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppCxt } from "../commons/context";

export default function Choose() {
  const theme = useTheme();
  const appContext = useContext(AppCxt);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const wallet = await window
        .fetch(
          import.meta.env.VITE_CSTAR_API + "/proxy/pp-restapi-CD/v2/wallet",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${appContext?.walletToken}`,
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
        .then((responsedata) => {
          console.log("CHOOSE_GET_SUCCESS");
          setCards(
            responsedata.data.filter((item: any) => item.walletType == "Card")
          );
        })
        .catch((error) => {
          console.log("CHOOSE_GET_ERROR", error);
        });
    };

    fetch();
  }, []);

  const onFormChange = async () => {
    const checkBoxes = document.querySelectorAll(
      "#chooseForm input[type='checkbox']:checked"
    );
    setDisabledForm(checkBoxes.length == 0 ? true : false);
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const checkBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
      "#chooseForm input[type='checkbox']:checked"
    );
    checkBoxes.forEach(async (el, i) => {
      const hashpan = el.value;
      await window
        .fetch(
          import.meta.env.VITE_CSTAR_API + "/io/payment-instruments/" + hashpan,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${appContext?.bpdToken}`,
            },
            body: JSON.stringify({}),
          }
        )
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then((response) => response.json())
        .then((responsedata) => {
          console.log("PAYINSTRUMENTACTIVATION_PUT_SUCCESS");
        })
        .catch((error) => {
          console.log("PAYINSTRUMENTACTIVATION_PUT_ERROR", error);
        });

      if (i + 1 == checkBoxes.length) {
        navigate("/response");
      }
    });
  };

  return (
    <>
      <Typography variant="h4">
        Scegli quali metodi di pagamento abilitare
      </Typography>
      <Typography variant="body2" py={2}>
        Poi, usali per pagare e chiedi all’esercente di usare Fatturazione
        Automatica.
      </Typography>
      <form onChange={onFormChange} onSubmit={onFormSubmit} id="chooseForm">
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 1,
            py: { xs: 1, md: 5 },
          }}
        >
          {cards.map((cardItem, i) => {
            return <Card cardData={cardItem} key={i} />;
          })}
        </Stack>
        <Box>
          <Button
            disabled={disabledForm}
            type="submit"
            variant="contained"
            size="small"
            sx={{ my: 3, width: 1 }}
          >
            Continua
          </Button>
        </Box>
      </form>
    </>
  );
}
