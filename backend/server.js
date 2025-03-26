// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length; // Anzahl der CPU-Kerne
require("dotenv").config();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers für jede CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Einen neuen Worker starten, wenn einer abstürzt
  });
} else {
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
    .then(() => console.log(`Worker ${process.pid}: MongoDB connected`))
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

  // API Endpoints für Games
  app.get("/api/games", async (req, res) => {
    try {
      const games = await Game.find();
      res.json(games);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/games/:id", async (req, res) => {
    try {
      const game = await Game.findById(req.params.id);
      if (!game) return res.status(404).json({ message: "Game not found" });
      res.json(game);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

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

  // API Endpoints für Producers
  app.get("/api/producers", async (req, res) => {
    try {
      const producers = await Producer.find();
      res.json(producers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

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
  app.listen(PORT, () =>
    console.log(`Worker ${process.pid} running on port ${PORT}`)
  );
}
