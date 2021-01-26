const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")))

const hbs = exphbs.create({
    extname: "handlebars",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/mainLayout"),
    partialsDir: path.join(__dirname, "views/pieces"),
    helpers: {
        calculation: function(value){
            return value + 7;
        },

        list: function(value, options){
            let out = "<ul>";

            for(let i = 0; i < value.length; i++){
                out = out + "<li>" + options.fn(value[i]) + "</li>";

            }
            return out + "</ul>";
        }
    }

});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//Routing
app.get("/", (req, res) => {
    res.render("index", {
                        title: "Home Page",
                         name: "Will",
                         style: "home.css",
                         age: "35",
                         isDisplayName: true,
                         isAgeEnable: true,
                         people: [
                             {firstName: "Yehuda", lastName: "Katz"},
                             {firstName: "Carl", lastName: "Lerche"},
                             {firstName: "Alan", lastName: "Johnson"}
                         ],
                         test: "<p>Welcome to New Orleans</p>",
                         test1: "<h3>This is fantastic</h3>"
                        })
})

app.get("/about", (req, res) => {

    res.render("about", {
                        title: "About Page",
                        style: "about.css",
                        description: "This is a description"
                        })
})

app.get("/dashboard", (req, res) => {
    res.render("dashboard", {
        isListEnabled: true,
        style: "dashboard.css",
        author: {
            firstName: "Peter",
            lastName: "James",
            project: {
                name: "Build random Quote"
            }
        }
    })
})

app.get("/each/helper", (req, res) => {
    res.render("contact", {
        people: [
            "Will",
            "James",
            "Peter",
            "Laura"
        ],
        user: {
            username: "will130785",
            age: 35,
            phone: 09
        },
        lists: [
            {
                items: ["Mango", "Banana", "Pineapple"]
            },
            {
                items: ["Potato", "Manioc", "Avocado"]
            }
        ]
    })
})

app.get("/look", (req, res) => {
    res.render("lookup", {
        user: {
            username: "will130785",
            age: 35,
            phone: 09
        },
        people: [
            "Will",
            "Laura",
            "Peter",
            "Paul"
        ]
    })
})


app.listen(3000, function(){
    console.log("Server running on port 3000")
});