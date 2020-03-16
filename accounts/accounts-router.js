const express = require("express");

const db = require("../data/dbConfig.js"); //connection to the database

const router = express.Router();

router.get("/", (req, res) => {
    //get data from the db
    //select * from accounts
    db.select("*")
        .from('accounts') //returns a promise
        .then(rows => {
            res.status(200).json({ data: rows });
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error that occurred" });
          });
})

router.get("/:id", (req, res) => {
    db("accounts")
      .where({ id: req.params.id })
      .first()
      .then(account => {
        if (account) {
          res.status(200).json({ data: account });
        } else {
          res.status(404).json({ message: "Account not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "An error has occurred" });
      });
  });

  router.post("/", (req, res) => {
    db("accounts")
      .insert(req.body, "id")
      .then(ids => {
        res.status(201).json({ results: ids });
      })
      .catch(error => {
        res.status(500).json({ message: "An error has occurred" });
      });
  });

  router.put("/:id", (req, res) => {
    const changes = req.body;
  
    db("accounts")
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "Account updated successfully" });
        } else {
          res.status(404).json({ message: "Account not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "An error has occurred" });
      });
  });
  
router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del() // delete the records
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "Account deleted successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "An error has occurred" });
    });
});

module.exports = router;