import React, { createContext, useState } from "react";

export interface IAppContext {
  bpdToken: string;
  spidToken: string;
  walletToken: string;
  setBpdToken: React.Dispatch<React.SetStateAction<string>>;
  setSpidToken: React.Dispatch<React.SetStateAction<string>>;
  setWalletToken: React.Dispatch<React.SetStateAction<string>>;
}
export const AppCxt = createContext<IAppContext | null>(null);
