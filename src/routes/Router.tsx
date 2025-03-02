import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Nsd from "../pages/Nsd";
import Nci from "../pages/Nci";
import Giggy from "../pages/Giggy";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Nsd" element={<Nsd />} />
        <Route path="/Nci" element={<Nci />} />
        <Route path="/Giggy" element={<Giggy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
