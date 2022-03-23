var Post = Parse.Object.extend ("Post");
var post = new Post();
// post.set("body", "Hello my name is Asim");
// post.set("tags", ["first-post", "welcome"]);
// post.set("numComments", 0);
var data = {
 "body": "Hello my name is Asim",
 "tags": ["first-post", "welcome"],
 "numComments": 0
};
       
post.save (data, {
 success: function (obj) {
    console.log("Success fully saved " + obj.id);
 },
 error: function(err) {
   console.error(err);
 }
});