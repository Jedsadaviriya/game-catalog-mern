// generateGames.js
const fs = require("fs");

// Function to generate a random date between two years
function randomDate(startYear, endYear) {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString();
}

// Function to generate random game data
function generateGames(count) {
  const genres = [
    "RPG",
    "Action",
    "Adventure",
    "Simulation",
    "Platformer",
    "Puzzle",
    "Shooter",
    "Strategy",
  ];
  const platforms = [
    "PC",
    "PS4",
    "Xbox One",
    "Nintendo Switch",
    "PS5",
    "Xbox Series X",
  ];
  const producers = Array.from({ length: 20 }, (_, i) => 101 + i); // Producer IDs 101 to 120

  const games = [];
  for (let i = 21; i <= count; i++) {
    // Start from ID 21 since you already have 20 games
    games.push({
      _id: i,
      Title: `Game ${i}`,
      Releasedate: randomDate(2000, 2023),
      Price: parseFloat((Math.random() * 60).toFixed(2)), // Random price between 0 and 60
      Rating: parseFloat((Math.random() * 10).toFixed(1)), // Random rating between 0 and 10
      Description: `Description for Game ${i}`,
      Genres: [genres[Math.floor(Math.random() * genres.length)]],
      Platforms: [platforms[Math.floor(Math.random() * platforms.length)]],
      ProducerId: producers[Math.floor(Math.random() * producers.length)],
    });
  }
  return games;
}

// Generate 1,000 games
const games = generateGames(1000); // This will generate games with IDs 21 to 1000

// Save to a JSON file
fs.writeFileSync("games_1000.json", JSON.stringify(games, null, 2));
console.log("Generated 1,000 games in games_1000.json");
