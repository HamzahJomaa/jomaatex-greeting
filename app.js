const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const path = require("path");
const crypto = require("crypto")
const User = require("./User")

var spawn = require("child_process").spawn;
const { connectDb } = require("./DatabaseConnection")



app.set("view engine", "ejs");
app.set("views", "Views");

app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.urlencoded({extend: false}));


app.post("/post",async (req,res) => {
    let {name,phoneNumber,city} = req.body
    let promoCode = crypto.randomBytes(3).toString("hex").toUpperCase()
    await User.create({fullName:name,phoneNumber,city,promoCode})
    let filename = crypto.randomBytes(16).toString("hex")
    res.render("thank-you-page",{filename,promoCode})
    // const python = spawn('python3', ['Public/pythonCode.py', name, filename]);
    //
    // python.stdout.on('data', (data) => {
    //     console.log('pattern: ', data.toString());
    // });
    //
    // python.stderr.on('data', (data) => {
    //     console.error('err: ', data.toString());
    // });
    //
    // python.on('error', (error) => {
    //     console.error('error: ', error.message);
    // });
    //
    // python.on('close', (code) => {
    //     console.log('child process exited with code ', code);
    //     res.render("thank-you-page",{filename: `${filename}.png`})
    // });
})
app.get("/",(req,res)=>{
    res.render("index-leadgen")
})

connectDb(() => {
    // httpServer.listen(3500)
    // httpsServer.listen(port, "0.0.0.0")
    app.listen(3000, "0.0.0.0", () => {
        console.log(`Listening on port 3000`)
    })
})