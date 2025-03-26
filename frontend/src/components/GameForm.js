// frontend/src/components/GameForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function GameForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({
    _id: "",
    Title: "",
    Releasedate: "",
    Price: "",
    Rating: "",
    Description: "",
    Genres: [],
    Platforms: [],
    ProducerId: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/games/${id}`)
        .then((response) => setGame(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Genres" || name === "Platforms") {
      setGame({ ...game, [name]: value.split(",").map((item) => item.trim()) });
    } else {
      setGame({ ...game, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "put" : "post";
    const url = id
      ? `http://localhost:5000/api/games/${id}`
      : "http://localhost:5000/api/games";

    axios[method](url, game)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Game" : "Add New Game"}</h2>
      <input
        type="number"
        name="_id"
        placeholder="ID"
        value={game._id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Title"
        placeholder="Title"
        value={game.Title}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="Releasedate"
        value={
          game.Releasedate
            ? new Date(game.Releasedate).toISOString().split("T")[0]
            : ""
        }
        onChange={handleChange}
      />
      <input
        type="number"
        name="Price"
        placeholder="Price"
        value={game.Price}
        onChange={handleChange}
      />
      <input
        type="number"
        name="Rating"
        placeholder="Rating"
        value={game.Rating}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Description"
        placeholder="Description"
        value={game.Description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Genres"
        placeholder="Genres (comma-separated)"
        value={game.Genres?.join(", ") || ""}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Platforms"
        placeholder="Platforms (comma-separated)"
        value={game.Platforms?.join(", ") || ""}
        onChange={handleChange}
      />
      <input
        type="number"
        name="ProducerId"
        placeholder="Producer ID"
        value={game.ProducerId}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => navigate("/")}>
        Cancel
      </button>
    </form>
  );
}

export default GameForm;
