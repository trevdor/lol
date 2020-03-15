import React from "react";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import { AppStateProvider } from "./app-state";
import appReducer, { initialState } from "./appReducer";
import useAuth from "./useAuth";

import "./App.css";

function App() {
  const { authAttempted, auth } = useAuth();
  if (!authAttempted) return null;
  return <div className="Layout">{auth ? <LoggedIn /> : <LoggedOut />}</div>;
}

export default () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <LoggedOut />
  </AppStateProvider>
);
