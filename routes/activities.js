const express = require("express");
const router = express.Router();
const connection = require("../config");

//1. Je veux récupérer toutes les activités
router.get('/', (req, res) => {
    connection.query("SELECT * FROM activity", (err, results) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(results);
        }
    })
});

// Créer une activité lié a un evenement
router.post('/', (req, res) => {
  const formBody = req.body;

  connection.query('INSERT INTO activity SET ?', formBody, (err, results) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(201)
    }
  })
})


// Récupérer les activités lié a un evenement en particulier

router.get('/events/:id', (req, res) => {
  const idParams = req.params.id;
  connection.query('SELECT * FROM activity WHERE event_id = ?', idParams, (err, results) => {
    if(err){
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

// Délié une activité a un evenement en particulier
router.put('/events/:id', (req, res) => {
  const idParams = req.params.id;
  const eventId = req.body.event_id;
  const body = eventId || null

  connection.query('UPDATE activity SET event_id = ? WHERE event_id = ?', [body, idParams], (err, results) => {
    if(err){
      res.status(500).send(err)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router;

// Enzo le plus beau