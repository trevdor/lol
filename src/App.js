import { BrowserRouter as Router, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { AppStateProvider } from "./app-state";
import appReducer, { initialState } from "./appReducer";
import LoggedOut from "./LoggedOut";
import FeatureList from "./FeatureList";

import "./App.css";

const App = () => (
  <AppStateProvider reducer={appReducer} initialState={initialState}>
    <ChakraProvider>
      <Router>
        <Route path="/features">
          <FeatureList />
        </Route>
        <Route path="/" exact>
          <LoggedOut />
        </Route>
      </Router>
    </ChakraProvider>
  </AppStateProvider>
);

export default App;
