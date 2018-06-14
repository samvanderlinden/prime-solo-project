const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('GET all articles route');
    if (req.isAuthenticated()) {
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
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "article_table"
                         WHERE "article_table"."article_type" = 'strength training';`
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
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "article_table"
                        WHERE "article_table"."article_type" = 'aerobic training';`

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
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "article_table"
                        WHERE "article_table"."article_type" = 'high intensity interval training';`
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
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "article_table"
                        WHERE "article_table"."article_type" = 'yoga';`
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
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "article_table" ("title", "link", "study_details", "date_posted", "article_type", "user_id")
                        VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(queryText, [req.body.title, req.body.link, req.body.study_details, req.body.date_posted, req.body.article_type, req.user.id])
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

router.post('/aerobic', (req, res) => {
    console.log('POST route');
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "article_table" ("title", "link", "study_details", "date_posted", "article_type", "user_id")
                        VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(queryText, [req.body.title, req.body.link, req.body.study_details, req.body.date_posted, req.body.article_type, req.user.id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('error on aerobic post', error)
            })
    } else {
        res.sendStatus(403);
    }
});

router.post('/hiit', (req, res) => {
    console.log('POST route');
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "article_table" ("title", "link", "study_details", "date_posted", "article_type", "user_id")
                        VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(queryText, [req.body.title, req.body.link, req.body.study_details, req.body.date_posted, req.body.article_type, req.user.id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('error on hiit post', error)
            })
    } else {
        res.sendStatus(403);
    }
});

router.post('/yoga', (req, res) => {
    console.log('POST route');
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "article_table" ("title", "link", "study_details", "date_posted", "article_type", "user_id")
                        VALUES ($1, $2, $3, $4, $5, $6)`;
        pool.query(queryText, [req.body.title, req.body.link, req.body.study_details, req.body.date_posted, req.body.article_type, req.user.id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('error on yoga post', error)
            })
    } else {
        res.sendStatus(403);
    }
});

//DELETE
router.delete('/strength', (req, res) => {
    console.log('DELETE strength article route');
    if (req.isAuthenticated() && req.query.user_id == req.user.id) {
        let queryText = `DELETE FROM "article_table" WHERE "id" = $1`;
        pool.query(queryText, [req.query.id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on DELETE: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/aerobic', (req, res) => {
    console.log('DELETE aerobic article route');
    if (req.isAuthenticated() && req.query.user_id == req.user.id) {
        let queryText = `DELETE FROM "article_table" WHERE "id" = $1`;
        pool.query(queryText, [req.query.id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on DELETE: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/hiit', (req, res) => {
    console.log('DELETE hiit article route');
    if (req.isAuthenticated() && req.query.user_id == req.user.id) {
        let queryText = `DELETE FROM "article_table" WHERE "id" = $1`;
        pool.query(queryText, [req.query.id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on DELETE: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.delete('/yoga', (req, res) => {
    console.log('DELETE yoga article route');
    if (req.isAuthenticated() && req.query.user_id == req.user.id) {
        let queryText = `DELETE FROM "article_table" WHERE "id" = $1`;
        pool.query(queryText, [req.query.id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on DELETE: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

//PUT
router.put('/strength', (req, res) => {
    console.log('PUT route');
    console.log('PUT req.body', req.body);
    if(req.isAuthenticated() && req.body.user_id == req.user.id) {
        let queryText = `UPDATE "article_table" SET "title" = $1, "link" = $2, "study_details" = $3, "date_posted" = $4, "article_type" = $5, "user_id" = $6
                        WHERE "id" = $7`;
        
        pool.query(queryText, [req.body.title, req.body.link, req.body.study_details, req.body.date_posted, req.body.article_type, req.body.user_id, req.body.id])
        .then((result) => {
            console.log('PUT result.rows:', result.rows)
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error on PUT: ', error)
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }

});

router.put('/aerobic', (req, res) => {
    console.log('PUT route');
    console.log('PUT req.body', req.body);
    if(req.isAuthenticated() && req.body.user_id == req.user.id) {
        let queryText = `UPDATE "article_table" SET "title" = $1, "link" = $2, "study_details" = $3, "date_posted" = $4, "article_type" = $5, "user_id" = $6
                        WHERE "id" = $7`;
        
        pool.query(queryText, [req.body.title, req.body.link, req.body.study_details, req.body.date_posted, req.body.article_type, req.body.user_id, req.body.id])
        .then((result) => {
            console.log('PUT result.rows:', result.rows)
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error on PUT: ', error)
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }

});

module.exports = router;