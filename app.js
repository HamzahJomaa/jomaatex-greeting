const express = require("express");
const bodyParser = require("body-parser");
const app = express()
const path = require("path");
const crypto = require("crypto")

var spawn = require("child_process").spawn;



app.set("view engine", "ejs");
app.set("views", "Views");

app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.urlencoded({extend: false}));


app.post("/post",async (req,res) => {
    let filename = crypto.randomBytes(16).toString("hex")
    const python = spawn('python3', ['Public/pythonCode.py', req.body.name, filename]);

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
        res.render("thank-you-page",{filename: `${filename}.png`})

    });
})
app.get("/",(req,res)=>{
    res.render("index-leadgen")
})

app.listen(3000,()=>{
    console.log("app is listening")
})