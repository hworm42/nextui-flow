const express = require('express');
    const db = require('./db.js');
    const app = express();
    const port = 3000;

    // API endpoint to get users
    app.get('/users', (req, res) => {
      db.all("SELECT UserID AS id, Username, Email, DateCreated, Bio, ProfilePicture, FollowersCount, FollowingCount FROM Users", [], (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.json({
          message: "success",
          data: rows
        });
      });
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
