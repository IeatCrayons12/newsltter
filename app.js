const express = require("express")
const bodyParser = require("body-parser")
const https =require("https")

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/", function(req,res){
    const Fname=req.body.fname
    const Lname=req.body.lname
    const Mail=req.body.mail

    const data ={
        members: [
            {
                email_address: Mail,
                status:"subscribed",
                merge_fields:{
                    FNAME:Fname,
                    LNAME:Lname
                }
            }
        ]
    }
    const jsondata = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/07f6cffc6f";
    const options  ={
        method:"POST",
        auth:"nigga:0d9a171ce8f28157ac99f2a10cc2ab32-us18"
    }
    const request = https.request(url,options,function(response){
      if (response.statusCode === 200) {
        res.sendFile(__dirname+"/success.html")
      } else {
        res.sendFile (__dirname+"/failure.html")
      }

        response.on("data", function(data){
        console.log(JSON.parse(data));
        
     });
    });
    request.write(jsondata);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function()
{
    console.log("nigga3000")
})

//0d9a171ce8f28157ac99f2a10cc2ab32-us18 api key

//07f6cffc6f. audience id

