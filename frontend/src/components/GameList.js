// frontend/src/components/GameList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/games")
      .then((response) => setGames(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <Link to="/edit">
        <button>Add New Game</button>
      </Link>
      {games.map((game) => (
        <div key={game._id} className="game-card">
          <h3>{game.Title}</h3>
          <p>{game.Description || "N/A"}</p>
          <Link to={`/details/${game._id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default GameList;
