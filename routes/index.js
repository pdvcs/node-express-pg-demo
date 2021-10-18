var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index");
});

/* GET home page. */
router.get("/health", function (req, res, next) {
    res.json({
        message: "alive",
    });
});

module.exports = router;
