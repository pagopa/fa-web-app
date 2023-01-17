import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Onboarding from "./routes/onboarding";
import Root from "./routes/root";
import Response from "./routes/response";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
/* MUI Italia theme */
import { theme } from "@pagopa/mui-italia";
import { Layout } from "./commons/layout";
import { ThemeProvider } from "@mui/material";
import Choose from "./routes/choose";
import Transactions from "./routes/transactions";
import { AppCxt, IAppContext } from "./commons/context";

export default function App() {
  const [spidToken, setSpidToken] = useState("");
  const [bpdToken, setBpdToken] = useState("");
  const [walletToken, setWalletToken] = useState("");

  const appContext: IAppContext = {
    bpdToken: bpdToken,
    spidToken: spidToken,
    walletToken: walletToken,
    setBpdToken: setBpdToken,
    setSpidToken: setSpidToken,
    setWalletToken: setWalletToken,
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/onboarding",
      element: <Onboarding />,
    },
    {
      path: "/choose",
      element: <Choose />,
    },
    {
      path: "/response",
      element: <Response />,
    },
    {
      path: "/transactions",
      element: <Transactions />,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppCxt.Provider value={appContext}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </AppCxt.Provider>
    </ThemeProvider>
  );
}
