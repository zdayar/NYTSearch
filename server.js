// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

// Require all models
var db = require("./models");

// set server port number
var PORT = process.env.PORT || 3001;

// Initialize Express
var app = express();

// Run Morgan for http request logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

app.use(express.static("./client/public"));

// -------------------------------------------------

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
var localDatabaseUri = "mongodb://localhost/nytreact";

if (process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}
else {
    mongoose.connect(localDatabaseUri, {useMongoClient: true});
}


var dbConnection = mongoose.connection;


dbConnection.on("error", function (err) {
    console.log("Mongoose Error: ", err);
});

dbConnection.once("open", function () {
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------


// Main "/" Route. This will redirect the user to our rendered React application
app.get('/', function (req, res) {
    res.render('/index.html');
});

// This is the route we will send GET requests to retrieve our most recent click data.
// We will call this route the moment our page gets rendered

//show all saved articles
app.get('/api/saved', function (req, res) {
    //console.log("Server: getting all saved articles");
    db.Article
    .find()
    .then(function (articles) {
        res.json(articles);
    })
    .catch(function (err) {
        // If an error occurs, send the error back to the client
        res.json(err);
    });
});

//save an article
app.post('/api/saved', function (req, res) {
    //console.log("Server: saving article", req.query);
    db.Article
    .create(req.query)
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
    });
});

//delete a saved article
app.delete('/api/saved', function (req, res) {
    //console.log("Server: deleting saved article", req.query._id);
    db.Article
    .findByIdAndRemove({_id: req.query._id})
    .then(function (result) {
        res.json(result);
    })
    .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
    });
});

// -------------------------------------------------

// Starting our express server
app.listen(PORT, function () {
    console.log("server.js listening on PORT: " + PORT);
});
