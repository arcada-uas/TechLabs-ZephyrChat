const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 443;
app.use(express.static('public')) // For serving static files from public folder.
app.use(express.json()); // For parsing application/json

// Routes
app.post("/api/", async (req, res) => {
  // Send message to Model API
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "model": "zephyr", "prompt": req.body.question})
});
  // Return stream of Uint8Array
  for await (const chunk of response.body) {
    res.write(chunk); // took me ages to find this oh so obvious method!
  }
  
});

// Read SSL certificate and key files
const options = {
  // Replace these with location of servers certificates
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./fullchain.pem"),
};

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});
