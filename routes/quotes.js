const express = require("express");
const router = express.Router();
const quotesSvc = require("../services/quotes");

/* GET /quotes?page=xx */
router.get("/", async function (req, res, next) {
    try {
        res.json(await quotesSvc.getMultiple(req.query.page));
    } catch (err) {
        console.error(`Error while getting quotes `, err.message);
        next(err);
    }
});

/* POST quotes */
router.post("/", async function (req, res, next) {
    try {
        res.json(await quotesSvc.create(req.body));
    } catch (err) {
        console.error(`Error while posting quotes: `, err.message);
        next(err);
    }
});

module.exports = router;
