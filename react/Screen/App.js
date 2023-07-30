import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Parallax from "./Parallax";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/parallax" element={<Parallax />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
