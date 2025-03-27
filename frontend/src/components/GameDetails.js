import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/games/${id}`)
      .then((response) => {
        setGame(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Fehler beim Laden des Spiels: " + error.message);
        setLoading(false);
        console.error(error);
      });
  }, [id]);

  if (loading) return <Typography>Lade Spiel...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!game) return <Typography>Spiel nicht gefunden.</Typography>;

  return (
    <div className="game-card">
      <h2>{game.Title}</h2>
      <p>
        <strong>Description:</strong> {game.Description || "N/A"}
      </p>
      <p>
        <strong>Release Date:</strong>{" "}
        {game.Releasedate
          ? new Date(game.Releasedate).toLocaleDateString()
          : "N/A"}
      </p>
      <p>
        <strong>Price:</strong> ${game.Price || "N/A"}
      </p>
      <p>
        <strong>Rating:</strong> {game.Rating || "N/A"}
      </p>
      <p>
        <strong>Genres:</strong> {game.Genres?.join(", ") || "N/A"}
      </p>
      <p>
        <strong>Platforms:</strong> {game.Platforms?.join(", ") || "N/A"}
      </p>
      <p>
        <strong>Producer ID:</strong> {game.ProducerId || "N/A"}
      </p>
      <Link to={`/edit/${game._id}`}>
        <button>Edit</button>
      </Link>
      <Link to="/">
        <button>Back to List</button>
      </Link>
    </div>
  );
}

export default GameDetails;
