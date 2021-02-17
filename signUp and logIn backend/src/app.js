const { static } = require("express");
const express = require("express");
const path = require("path")
const hbs = require("hbs")
const app = express();
require("./db/conn")
const Register = require("./models/register")

const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")



app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views",template_path)
hbs.registerPartials(partials_path)

app.get("/", (req, res) => {
    res.render("index");
})
app.get("/register", (req, res) => {
    res.render("register")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/register", async (req, res) => {
    try {
        const registerEmployee = await new Register({
            myUsername: req.body.myUsername,
            myEmail: req.body.myEmail,
            myPassword: req.body.myPassword
        })
        const registered = await registerEmployee.save();
        res.status(201).render("index")
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const myEmail = req.body.myEmail;
        const myPassword = req.body.myPassword;
        const useremail = await Register.findOne({ myEmail: myEmail })
        if (useremail.myPassword === myPassword) {
            res.status(201).render("index");
        } else {
            res.send("invalid login details")
        }
    } catch (error) {
        res.status(400).send("invalid login details")
    }
})

app.listen(port, () => {
    console.log(`server is running at port no ${port}`)
})