//All the Routes in this file are branching from the root localhost3001 route base

const router = require("express").Router(); //using the built in express router to trigger my view
const { Project, User } = require("../models"); //javascript will automatically go to index.js to find the models
const withAuth = require("../utils/auth"); //will redirect un logged in users to login

//TO DO:
//RENDERING THE addpost view
//RENDERING THE allposts view
//RENDERING THE comment view
//RENDERING THE homepage view
//RENDERING THE mailing view
//RENDERING THE mainpage view
//RENDERING THE reviewallposts view
//RENDERING THE signup view

//RENDERING THE ALLPOST view
router.get("/", async (req, res) => {
	//home page on 3001
	try {
		// Get all projects and JOIN with user data
		const data = await SeedOffers.findAll({
			//Make sure there is a model called SeedOffers in the models folder
			//"SeedOffers" will be exported from models folder //findAll is a sequelize method
			include: [
				{
					model: User, //include the user, limit to name
					attributes: ["name"], //limiting what the database hands to us
				},
			],
		});
		// Serialize data so the template can read it
		const seedoffers = data.map((seedoffers) =>
			seedoffers.get({ plain: true })
		); //strip out the metadata to make it cleaner before handing to fron end

		// Pass serialized data and session flag into template
		res.render("ALLPOST", {
			//renders ALLPOST.handlebars . handlebars //connect here to hoon's views (handlebars)
			seedoffers, //hands the view the clean projects
			logged_in: req.session.logged_in, //hands the view the user logged on status
		});
	} catch (err) {
		res.status(500).json(err);
	}
});
