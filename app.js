const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const path = require("path");
const crypto = require("crypto")
const User = require("./User")

var spawn = require("child_process").spawn;
const { connectDb } = require("./DatabaseConnection")



app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.urlencoded({extend: false}));


app.post("/post",async (req,res) => {
    let {name,phoneNumber,city,instagram} = req.body
    console.log({name,phoneNumber,city,instagram})
    if (!name || !phoneNumber || !city || !instagram || name === "" || phoneNumber === "" || city === "" || instagram === ""){
        return res.redirect("back")
    }
    let promoCode = crypto.randomBytes(3).toString("hex").toUpperCase()
    let checkUser = await User.find({instagram})
    if (checkUser.length > 0){
        return res.render("index-leadgen",{error:"User Already Registered"})
    }
    await User.create({fullName:name,phoneNumber,city,promoCode,instagram})
    let filename = crypto.randomBytes(16).toString("hex")
    const python = spawn('python3', ['Public/pythonCode.py', name, filename]);

    python.stdout.on('data', (data) => {
        console.log('pattern: ', data.toString());
    });

    python.stderr.on('data', (data) => {
        console.error('err: ', data.toString());
    });

    python.on('error', (error) => {
        console.error('error: ', error.message);
    });

    python.on('close', (code) => {
        console.log('child process exited with code ', code);
        res.render("thank-you-page",{filename: `${filename}.jpeg`})
    });
})
app.get("/",(req,res)=>{
    return res.render("index-leadgen",{error: ""})
})

connectDb(() => {
    // httpServer.listen(3500)
    // httpsServer.listen(port, "0.0.0.0")
    app.listen(3000, "0.0.0.0", () => {
        console.log(`Listening on port 3000`)
    })
})