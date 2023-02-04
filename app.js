const express= require("express");
const formidable = require('formidable');
const bodyParser= require("body-parser");
const serveIndex=require('serve-index');
const fs = require('fs');
var mv = require('mv');


const app= express();
app.use(express.static("./"));
app.use('/dir', express.static('dir'), serveIndex('dir', {icons:true}))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

});


app.post("/fileupload", function (req, res) {
  
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = 'D:/html/fileup/dir/' + files.filetoupload.originalFilename;
      fs.copyFile(oldpath, newpath, function (err) {
        if (err) throw err;
        // res.write('File uploaded and moved!');
        console.log("Sucess!")
        
    });
        

 });
});

app.listen(3000, function(){
    console.log("server is running on port 3000");
})
