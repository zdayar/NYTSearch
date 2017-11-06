const mongoose = require('mongoose'),
        Promise = require('bluebird'),
        express = require('express'),
        util = require('util'),
        app = express();

mongoose.Promise = Promise;

// Create a Schema class with mongoose
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    headline: {
        type: String,
        trim: true
    },
    snippet: {
        type: String,
        trim: true
    },
    byline: {
        type: String,
        trim: true
    },
    pub_date: {
        type: Date,
        trim: true
    },
    date_saved: {
        type: Date,
        default: Date.now
    },
    web_url: {
        type: String,
        trim: true,
        unique: true,
        required: "url is required"
    }
});


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;