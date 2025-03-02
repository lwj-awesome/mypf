import React from "react";
import GlobalStyles from "./styles/GlobalCss";
import Layout from "./components/Layout";
import Router from "./routes/Router";
import { IndexProvider } from "./context/IndexProvider";

function App(): JSX.Element {
  return (
    <IndexProvider>
      <div className="App">
        <GlobalStyles />
        <Layout />
        <Router />
      </div>
    </IndexProvider>
  );
}

export default App;
