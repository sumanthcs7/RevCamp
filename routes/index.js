var express = require("express");
// const { route } = require("./campgrounds");
var router = express.Router();
var passport=require("passport");
var User = require("../models/user");
//rooot route
router.get("/",function(req,res){
	res.render("landings");
});
//signup route
router.get("/register",function(req, res){
	res.render("register");
});
//handle signup logic
router.post("/register",function(req,res){
	var newUser = new User({username:req.body.username});
	User.register(newUser,req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("back");
		
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","welcome to RevCamp "+req.body.username);
			res.redirect("/campgrounds");
		});
	});
});

//login form
router.get("/login",function(req,res){
	res.render("login");
});
//login post request
router.post("/login",passport.authenticate("local",
	{
		successRedirect:"/campgrounds",
		failureRedirect:"/login"
	}),function(req,res){
});
//logout logic
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","logged you out!");
	res.redirect("/campgrounds");
});


module.exports=router;