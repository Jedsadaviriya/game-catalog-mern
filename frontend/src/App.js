// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameList from "./components/GameList";
import GameDetails from "./components/GameDetails";
import GameForm from "./components/GameForm.js";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Game Catalog</h1>
        <Routes>
          <Route path="/" element={<GameList />} />
          <Route path="/details/:id" element={<GameDetails />} />
          <Route path="/edit/:id?" element={<GameForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
