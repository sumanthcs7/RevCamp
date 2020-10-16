const comment = require("./models/comment");

var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	localStrategy = require("passport-local"),
	Campground = require("./models/campground"),
	methodOverride = require("method-override"),
	flash      = require("connect-flash"),
	seedDB     = require("./seeds"),
	User       = require("./models/user"),
	Comment    = require("./models/comment");
//requiring routes
var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes = require("./routes/index");


	
//passport confi
app.use(require("express-session")({
	secret:"Catch me in the camp if you can",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose.connect("mongodb://localhost:27017/rev_camp_v12",{ useNewUrlParser: true,useUnifiedTopology: true});
mongoose.connect("mongodb+srv://cs7:enter@cs7.8vfux.mongodb.net/CS7?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true});
process.env.databaseERL
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));  
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database
app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


// var campgrounds=[
// 	{name:"Ananthagiri Hills",image:"https://image.shutterstock.com/image-photo/medium-wide-shot-shepherd-horsley-600w-355796165.jpg"},
// 	{name:"Bugga Rameshwaram",image:"http://www.mandirinfo.com/img/Mandir_Images/vikarabad_bugga_ramalingeswara_l.jpg"}
// 	,{name:"Kotpalli Reservior",image:"https://cdn.telanganatoday.com/wp-content/uploads/2018/01/kotepally.jpg"}
// ];


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.listen(3000,function(){
	console.log("RevCamp has started");
});