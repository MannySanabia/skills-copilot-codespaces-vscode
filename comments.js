// Create web server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

// Use the body parser middleware to parse the request body
app.use(bodyParser.json());

// Set the port to 3000
const port = 3000;

// Create a route to handle GET requests
app.get("/comments", (req, res) => {
  // Read the contents of the comments file
  fs.readFile(path.join(__dirname, "comments.json"), "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments file");
      return;
    }

    // Parse the contents of the file as JSON
    const comments = JSON.parse(data);

    // Send the comments as a response
    res.json(comments);
  });
});

// Create a route to handle POST requests
app.post("/comments", (req, res) => {
  // Read the contents of the comments file
  fs.readFile(path.join(__dirname, "comments.json"), "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments file");
      return;
    }

    // Parse the contents of the file as JSON
    const comments = JSON.parse(data);

    // Add the new comment to the array of comments
    comments.push(req.body);

    // Write the updated comments back to the file
    fs.writeFile(
      path.join(__dirname, "comments.json"),
      JSON.stringify(comments, null, 2),
      (err) => {
        if (err) {
          res.status(500).send("Error writing comments file");
          return;
        }

        // Send a success response
        res.send("Comment added");
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
