const router = require("express").Router();
const news = require("./news");

// Book routes
router.use("/news", news);

module.exports = router;
