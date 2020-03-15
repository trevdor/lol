import React from "react";
import { ColorModeProvider, ThemeProvider } from "@chakra-ui/core";
import LoggedOut from "./LoggedOut";
import { AppStateProvider } from "./app-state";
import appReducer, { initialState } from "./appReducer";

import "./App.css";

export default () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <ThemeProvider>
      <ColorModeProvider>
        <LoggedOut />
      </ColorModeProvider>
    </ThemeProvider>
  </AppStateProvider>
);
