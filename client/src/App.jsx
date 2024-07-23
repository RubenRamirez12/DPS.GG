import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import LOLMain from "./components/LeagueOfLegends/LOLMain";

export default function App() {
  return (
    <div className="app__div">
      <div className="app__navbar">
        <Navbar />
      </div>
      <div className="app__main">
        <Routes>
          <Route path="/lol" element={<LOLMain/>} />
          <Route path="/osu" element={<h1>We are in osu</h1>} />
        </Routes>
      </div>
    </div>
  );
}
