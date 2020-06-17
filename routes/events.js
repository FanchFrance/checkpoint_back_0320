const express = require('express');
const router = express.Router();
const connection = require('../config');

// Récupérer tous les events
router.get('/', (req, res) => {
    connection.query('SELECT * FROM event', (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(result)
        }
    })
});

// Créer un évenement
router.post('/', (req,res) => {
    const formBody = req.body;
    connection.query('INSERT INTO event SET ?', [formBody], (err, results)  =>{
    if (err) {
        res.status(500).send(err);
    } else {
        res.sendStatus(201);
     }
})
})


// récupérer un seul evenement
router.get('/:id', (req, res) => {
  const idParams = req.params.id;
  connection.query('SELECT * FROM event WHERE id = ?', idParams, (err, results) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.json(results);
    }
  })
})


// Récupérer les activités lié a un evenement en particulier
router.get('/:id/activities', (req, res) => {
  const idParams = req.params.id;
  connection.query('SELECT a.title, a.description, a.picture, a.id, a.event_id FROM event as e JOIN activity as a ON a.event_id = e.id WHERE e.id = ?', idParams, (err, results) => {
    if(err){
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

//Supprimer un evenement

router.delete('/:id', (req, res) => {
  const idParams = req.params.id;
  connection.query('DELETE FROM event WHERE id = ?', idParams, (err, results) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(200)
    }
  })
})

//Modifier un évenement la suivante Emeline.
router.put('/:id', (req, res) => {
  const idParams = req.params.id;
  const formBody = req.body;

  connection.query('UPDATE event SET ? WHERE id = ?', [formBody, idParams], (err, results) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router;