const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
//gets unit squares associated with plot_id
router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "unit_squares"
                        WHERE "plot_id" = 
                            (SELECT id 
                            FROM plot 
                            WHERE product_id = $1);`;
    pool.query(queryText, [req.params.id] )
    .then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get unit squares by plot_id', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;