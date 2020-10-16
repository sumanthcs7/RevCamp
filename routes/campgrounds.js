var express = require("express");
const campground = require("../models/campground");
var router = express.Router();
var Campground = require("../models/campground");
const { route } = require("./comments");
var middleware = require("../middleware");
//index route
router.get("/",function(req,res){
	Campground.find({},function(err,allCampgrounds){
		if(err)
		{
			console.log(err);
		}else{
			res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
	

});
//create route
router.post("/",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var image= req.body.image;
	var price = req.body.price;
	var description= req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,image:image,price:price,description:description,author:author};
	Campground.create(newCampground,function(err,newcre){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});

});	
//create new
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});
//show page
router.get("/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
			
		}else{
			
			res.render("campgrounds/show",{campgrounds:foundCampground});
		}
	});
	
});
//edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){

		Campground.findById(req.params.id,function(err,foundCampground){
			res.render("campgrounds/edit",{campground:foundCampground});
				
		});
	
});
//update campground
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
//deleting routes
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports= router;