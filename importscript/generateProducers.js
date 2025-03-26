// generateProducers.js
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

// Function to generate random producer data
function generateProducers(count) {
  const countries = [
    "USA",
    "Japan",
    "Poland",
    "Australia",
    "Netherlands",
    "Sweden",
    "France",
    "UK",
    "Germany",
    "Canada",
    "South Korea",
    "China",
    "Spain",
    "Italy",
    "Brazil",
  ];

  const nameStems = [
    "Interactive",
    "Games",
    "Studio",
    "Soft",
    "Works",
    "Digital",
    "Entertainment",
    "Productions",
    "Developments",
    "Creative",
    "Pixel",
    "Game",
    "Tech",
    "Network",
    "Arts",
  ];
  const namePrefixes = [
    "Red",
    "Blue",
    "Green",
    "Golden",
    "Silver",
    "Epic",
    "Legendary",
    "Fantasy",
    "Adventure",
    "Action",
    "Retro",
    "Next",
    "Future",
    "Ancient",
    "Modern",
    "Alpha",
    "Beta",
    "Omega",
    "Neon",
    "Cyber",
  ];

  const producers = [];
  for (let i = 121; i <= count; i++) {
    const name = `${
      namePrefixes[Math.floor(Math.random() * namePrefixes.length)]
    } ${nameStems[Math.floor(Math.random() * nameStems.length)]}`;

    producers.push({
      _id: i,
      Name: name,
      Foundingdate: randomDate(1950, 2020),
      Country: countries[Math.floor(Math.random() * countries.length)],
    });
  }
  return producers;
}

// Generate 100 producers
const producers = generateProducers(1000); // Change this number as needed

// Save to a JSON file
fs.writeFileSync("producers_1000.json", JSON.stringify(producers, null, 2));
console.log(`Generated ${producers.length} producers in producers.json`);
