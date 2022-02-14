import React from "react";
import { Routes, Route, Outlet, Link, BrowserRouter } from "react-router-dom";

import Navbar from "./Component/Home/Navbar";
import AddData from "./Component/AddData/AddData";
import { ReadData } from "./Component/ReadData/ReadData";
import { UpdateData } from "./Component/UpdateData/UpdateData";
import { Home } from "./Component/Home/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route exact path="/AddData" element={<AddData />} />
            <Route exact path="/ReadData" element={<ReadData />} />
            <Route path="/UpdateData/:id" element={<UpdateData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
