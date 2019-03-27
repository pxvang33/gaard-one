const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const Swal = require('sweetalert2');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "product_type";`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows)
        console.log('Result.rows: ', result.rows);
    }).catch((error) => {
        console.log('Something went wrong in GET product types', error);
        res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/newproduct', rejectUnauthenticated, (req, res) => {
    //User must be authenticated and have admin rights
    if (req.isAuthenticated() && (req.user.admin || req.user.employee) ){
        const queryText = `INSERT INTO "product_type" ("product_name", "cost", "description")
                        VALUES ( $1, $2, $3 );`;
        const product = req.body;
        pool.query(queryText, [product.product_name, product.cost, product.description])
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('Something went wrong in POST new product', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});


/**
 * UPDATE router template
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
    //User must be authenticated and have admin rights
    if(req.isAuthenticated() && (req.user.admin || req.user.employee)  ){
        const product = req.body;
        const queryText = `UPDATE "product_type"
                        SET "product_name" = '${product.product_name}',
                            "cost" = '${product.cost}',
                            "description" = '${product.description}'
                        WHERE "id" = $1;`
        pool.query(queryText, [req.params.id])
        .then((update) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Something went wrong in PUT product type', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});


/** 
 * DEACTIVATE router template
 */
router.put('/deactivate/:id', rejectUnauthenticated, (req, res) => {
    //User must be authenticated and have admin rights
    if(req.isAuthenticated() && (req.user.admin || req.user.employee) ){
        console.log('In router deactivate PT', req.params.id);
        
        const queryText = `UPDATE "product_type" 
                           SET active = false
                           WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Something went wrong in DEACTIVATE product type', error);
            res.sendStatus(500);
        });
    }else{
        res.sendStatus(403);
    }
});

/**
 * REACTIVATE router template
 */
router.put('/reactivate/:id', rejectUnauthenticated, (req, res) => {
    //User must be authenticated and have admin rights
    if (req.isAuthenticated() && (req.user.admin || req.user.employee) ) {
        console.log('In router reactivate PT', req.params.id);

        const queryText = `UPDATE "product_type" 
                           SET active = true
                           WHERE "id" = $1;`;
        pool.query(queryText, [req.params.id])
            .then(() => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log('Something went wrong in REACTIVATE product type', error);
                res.sendStatus(500);
            });
    } else {
        res.sendStatus(403);
    }
});

/**
 * GET deactivated items router template
 */
router.get('/deactivate/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "product_type"
                       WHERE "active" = false;`;
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows)
        console.log('deActivated', result.rows);
    
    }).catch((error) => {
        console.log('Something went wrong in GET deActivate', error);
        res.sendStatus(500);
    })
})

module.exports = router;