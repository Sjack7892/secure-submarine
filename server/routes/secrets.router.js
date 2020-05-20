const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectTaco } = require('../modules/taco-middleware');

router.get('/', rejectTaco, (req, res) => {
    console.log('req.user:', req.user);
    // pool.query('SELECT * FROM "secret";')
    pool.query(`SELECT * FROM "secret" WHERE "secrecy_level" < ${req.user.clearance_level};`)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;