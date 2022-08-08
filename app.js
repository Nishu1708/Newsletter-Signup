
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req,res){
const firstname = req.body.fname;
const  lastName = req.body.lname;
const  email = req.body.email;

const  data = {
  members:[
{
  email_address:email,
  status: "subscribed",
  merge_fields:{
    FNAME: firstname,
    LNAME: lastName,

  }
}
  ]
};
const  jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/d1e7a2cced";

const options = {
  method:"POST",
  auth: "Nishu:9ed0a7f013233fafd80c92d9cac321e3-us14"
}
 const request = https.request(url, options, function(response){
   if(response.statusCode === 200)
   {
     res.sendFile(__dirname + "/success.html");
   }
   else
   {
     res.sendFile(__dirname + "/failure.html");
   }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();

})
app.post("/failure",function(req,res){
  res.redirect("/");
})

let port = process.env.PORT;
if(port == null || port == ""){
  port = 8000;
}

app.listen(port);
// app.listen(process.env.PORT || 3000, function(req,res){
//   console.log("server running at port 3000");
// })

// 9ed0a7f013233fafd80c92d9cac321e3-us14
//d1e7a2cced
// --data @- \
// <<EOF | jq '.id'
// {
//  "email_address": "$user_email",
//  "status": "subscribed",
//  "merge_fields": {
//  "FNAME": "$user_fname",
//  "LNAME": "$user_lname"
//  }
// }
// EOF
