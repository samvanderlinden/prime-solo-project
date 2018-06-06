const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET all articles route');
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "person"
                        JOIN "article_table" ON "article_table"."user_id" = "person"."id"
                        JOIN "likes_table" ON "likes_table"."article_id" = "article_table"."id";`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log('result.rows of GET strengths article:', result.rows);
        }).catch((error) => {
            console.log('error on GET strength article request:', error);
        })
    } else {
        res.sendStatus(403)
    }
});

router.get('/strength', (req, res) => {
    console.log('GET all strength training articles route');
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "person"
                        JOIN "article_table" ON "article_table"."user_id" = "person"."id"
                        JOIN "likes_table" ON "likes_table"."article_id" = "article_table"."id"
                        WHERE "article_table"."article_type" = 'strength training';`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log('result.rows of GET strengths article:', result.rows);
        }).catch((error) => {
            console.log('error on GET strength article request:', error);
        })
    } else {
        res.sendStatus(403)
    }
});

router.get('/aerobic', (req, res) => {
    console.log('GET all aerobic training articles route');
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "person"
                        JOIN "article_table" ON "article_table"."user_id" = "person"."id"
                        JOIN "likes_table" ON "likes_table"."article_id" = "article_table"."id"
                        WHERE "article_table"."article_type" = 'aerobic training';`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log('result.rows of GET aerobic article:', result.rows);
        }).catch((error) => {
            console.log('error on GET aerobic article request:', error);
        })
    } else {
        res.sendStatus(403)
    }
});

router.get('/hiit', (req, res) => {
    console.log('GET all hiit training articles route');
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "person"
                        JOIN "article_table" ON "article_table"."user_id" = "person"."id"
                        JOIN "likes_table" ON "likes_table"."article_id" = "article_table"."id"
                        WHERE "article_table"."article_type" = 'high intensity interval training';`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log('result.rows of GET hiit article:', result.rows);
        }).catch((error) => {
            console.log('error on GET hiit article request:', error);
        })
    } else {
        res.sendStatus(403)
    }
});

router.get('/yoga', (req, res) => {
    console.log('GET all yoga training articles route');
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "person"
                        JOIN "article_table" ON "article_table"."user_id" = "person"."id"
                        JOIN "likes_table" ON "likes_table"."article_id" = "article_table"."id"
                        WHERE "article_table"."article_type" = 'yoga training';`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
            console.log('result.rows of GET yoga article:', result.rows);
        }).catch((error) => {
            console.log('error on GET yoga article request:', error);
        })
    } else {
        res.sendStatus(403)
    }
});


/**
 * POST route template
 */
router.post('/strength', (req, res) => {
    console.log('POST route');
    if(req.isAuthenticated()) {
        let queryText = `INSERT INTO "article_table" ("title", "link", "study_details", "date_posted", "article_type", "user_id")
                        VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(queryText, [req.body.title, req.body.link, req.body.study_details, req.body.date_posted, req.body.article_type, req.body.user_id])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log('error on strength post', error)
        })
    } else {
        res.sendStatus(403);
    }
});


module.exports = router;