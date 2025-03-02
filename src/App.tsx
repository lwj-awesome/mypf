import React from "react";
import GlobalStyles from "./styles/GlobalCss";
import Layout from "./components/Layout";
import Router from "./routes/Router";

function App(): JSX.Element {
  return (
    <div className="App">
      <GlobalStyles />
      <Layout />
      <Router />
    </div>
  );
}

export default App;
