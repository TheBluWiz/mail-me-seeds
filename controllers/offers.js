const router = require("express").Router();

//localhost3001:/offers/

router.get("/request", async (req, res) => {
	res.render("request");
});

router.get("/myoffers", async (req, res) => {
	res.render("myoffers");
});

router.get("/form", async (req, res) => {
	res.render("offerform");
});

// router.get("/comments", async (req, res) => {
//     res.render("comment");
// })

module.exports = router;
