const express = require("express");

var mongo = require("mongodb").MongoClient;

var assert = require("assert");

var url = "mongodb://localhost:27017/searchResults";

const app = express();

const bodyParser = require("body-parser");

const fetch = require("node-fetch");

app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

var snippet = "wank off re";

// var name='Tanishq';

app.post("/query", function (req, res) {
  inp = req.body.name; //this contains the user input
  url =
    "http://api.serpstack.com/search?access_key=feda4bfe826d96873c7d4821c1496529&query=" +
    inp;
  let arr1 = [];
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "User 1" }),
  })
    .then((res) => res.json())
    .then((data) => {
      let i = 0;
      while (i != 5) {
        arr1[i] = data.organic_results[i].title;
        arr2[i] = data.organic_results[i].url;

        //   arr1.push(data.organic_results[i].title);
        //   arr2.push(data.organic_results[i].url);

        i++;
        // snippet=data.organic_results[i].snippet;
        // snippet=snippet.slice(12);
        // var item = {
        //     title_=data.organic_results[i].title,
        //     url_=data.organic_results[i].url,
        // };
        // mongo.connect('/insert',function (err,db) {
        //     assert.equal(null,err);
        //     db.collection('user-data').insertOne()
        // })
        // console.log(title_);
        // console.log(snippet);
      }

      // console.log(data);
    })

    .catch((error) => console.log("ERROR"));

  res.render("search", { arr1: arr1, arr2: arr2 });
  // res.render('search',{ inp: req.body.name  })
});

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(5000, function (err) {
  if (err) {
    console.log("Error in setting up the server.");
  }
  console.log("Serving at 127.0.0.1:5000");
});
