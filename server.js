const express = require('express');
    const sqlite3 = require('sqlite3').verbose();
    const app = express();
    const port = 3000;

    // Initialize SQLite database
    const db = new sqlite3.Database(':memory:');

    db.serialize(() => {
      db.run("CREATE TABLE user (info TEXT)");
      const stmt = db.prepare("INSERT INTO user VALUES (?)");
      stmt.run("First user");
      stmt.run("Second user");
      stmt.finalize();
    });

    // API endpoint to get users
    app.get('/users', (req, res) => {
      db.all("SELECT rowid AS id, info FROM user", [], (err, rows) => {
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
