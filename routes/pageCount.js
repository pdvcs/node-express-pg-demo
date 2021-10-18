const express = require("express");
const router = express.Router();
const quotesSvc = require("../services/quotes");

/* /pages -> getPageCount() */
router.get("/", async function (req, res, next) {
    try {
        res.json(await quotesSvc.getPageCount());
    } catch (err) {
        console.error(`Error while getting quotes `, err.message);
        next(err);
    }
});

module.exports = router;
