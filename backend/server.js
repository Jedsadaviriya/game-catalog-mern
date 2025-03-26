// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Game Schema
const gameSchema = new mongoose.Schema({
  _id: Number,
  Title: String,
  Releasedate: Date,
  Price: Number,
  Rating: Number,
  Description: String,
  Genres: [String],
  Platforms: [String],
  ProducerId: Number,
});

const Game = mongoose.model("Game", gameSchema);

// Producer Schema
const producerSchema = new mongoose.Schema({
  _id: Number,
  Name: String,
  Foundingdate: Date,
  Country: String,
});

const Producer = mongoose.model("Producer", producerSchema);

// API Endpoints for Games
// Get all games
app.get("/api/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific game by ID
app.get("/api/games/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new game
app.post("/api/games", async (req, res) => {
  const game = new Game({
    _id: req.body._id,
    Title: req.body.Title,
    Releasedate: req.body.Releasedate,
    Price: req.body.Price,
    Rating: req.body.Rating,
    Description: req.body.Description,
    Genres: req.body.Genres,
    Platforms: req.body.Platforms,
    ProducerId: req.body.ProducerId,
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a game
app.put("/api/games/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    Object.assign(game, req.body);
    const updatedGame = await game.save();
    res.json(updatedGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a game
app.delete("/api/games/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    await game.remove();
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API Endpoints for Producers
// Get all producers
app.get("/api/producers", async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific producer by ID
app.get("/api/producers/:id", async (req, res) => {
  try {
    const producer = await Producer.findById(req.params.id);
    if (!producer)
      return res.status(404).json({ message: "Producer not found" });
    res.json(producer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
