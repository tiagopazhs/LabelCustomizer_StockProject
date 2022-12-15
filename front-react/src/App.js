import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './screens/Home';
import Printer from './screens/Printer';
import Reader from './screens/Reader';
import ThreeRopes from './screens/ThreeRopes';
import Dash from './screens/Dash';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="/Printer-Customizer" element={<Printer />}/>
        <Route path="/Validation-Order" element={<Reader />}/>
        <Route path="/Three-Ropes" element={<ThreeRopes />}/>
        <Route path="/Orders-Dashboard" element={<Dash />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;