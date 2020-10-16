var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var data =[
    {
        name:"Ananthagiri Hills",
        image:"https://image.shutterstock.com/image-photo/medium-wide-shot-shepherd-horsley-600w-355796165.jpg",
        description:"this is very good hill"
    },
    {
        name:"Bugga Rameshwaram",
        image:"http://www.mandirinfo.com/img/Mandir_Images/vikarabad_bugga_ramalingeswara_l.jpg"
    },
    {
        name:"Kotpalli Reservior",
        image:"https://cdn.telanganatoday.com/wp-content/uploads/2018/01/kotepally.jpg"
    }
]
function seedDB(){
    //remove all campgrounds
    Campground.remove({},function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("removed campgrounds");
    // });
    //adding few campgrounds
    // data.forEach(function(seed){
    //    Campground.create(seed,function(err,campground){
    //         if(err)
    //         {
    //             console.log(err);
    //         }else{
    //             console.log("added a campground");
    //             //create a comment
    //             Comment.create({
    //                 text:"this plcae is very nice",
    //                 author:"Homer"
    //             },function(err,comment){
    //                 if(err)
    //                 {
    //                     console.log(err);
    //                 }else{
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("created new commet");
    //                 }
                  
    //             });
    //         }
    //    });
    });
   

    //add few comments

} 

module.exports = seedDB;