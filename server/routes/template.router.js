const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET all strength training articles
router.get('/', (req, res) => {
    console.log('GET all route');
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "article_table"`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log('result.rows of GET all articles:', result.rows);
        }).catch((error) => {
            console.log('error on GET all articles request:', error);
        })
    } else {
        res.sendStatus(403)
    }
});

// router.get('/', (req, res) => {
//     console.log('GET strength route');
//     if(req.isAuthenticated()) {
//         let queryText = `SELECT FROM "article_table" WHERE "article_type" = "strength"`;
//         pool.query(queryText)
//         .then((result) => {
//             res.send(result.rows);
//             console.log('result.rows of GET strengths article:', result.rows);
//         }).catch((error) => {
//             console.log('error on GET strength article request:', error);
//         })
//     } else {
//         res.sendStatus(403)
//     }
// });

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;