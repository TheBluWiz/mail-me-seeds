//The offers-route  does some CRUD for the offers table
//basically copied code from Stu Mini-Project, projectRoutes.js since "projects" are similar to "offers"
// in that they are chunks of text create by a user.
//"/addpost", addpostRoutes);
// router.use("/allposts", allpostsRoutes);
// router.use("/comment", commentRoutes);
// router.use("/mailing", mailingRoutes);
// router.use("/mainpage", mainpageRoutes);
// router.use("/reviewallposts", reviewallpostsRoutes);
// router.use("/signup", signupRoutes);

const router = require("express").Router();
const { Offer } = require("../../models");
const withAuth = require("../../utils/auth");

//post a new offer
router.post("/", withAuth, async (req, res) => {
	try {
		const newOffer = await Offer.create({
			offerDescription: req.body.offerDescription,
			user_id: req.session.user_id, //is the session user id different from our app user id?
		});

		res.status(200).json(newOffer);
	} catch (err) {
		res.status(400).json(err);
	}
});

//update an existing offer //maybe not necessary?
router.put("/:id", async (req, res) => {
	try {
		const offerUpdate = await Offer.update(
			{
				offerDescription: req.body.offerDescription,
				user_id: req.session.user_id,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		res.status(200).json(offerUpdate);
	} catch (err) {
		res.status(500).json(err);
	}
});

//deleting the logged-on person's offer
router.delete("/:id", withAuth, async (req, res) => {
	try {
		const offerData = await Project.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id, //
			},
		});

		if (!offerData) {
			res.status(404).json({ message: "No offer found with this id!" });
			return;
		}

		res.status(200).json(offerData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
