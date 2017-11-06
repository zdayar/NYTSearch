//promise-based http request package
const axios = require('axios'),
        qs = require('querystring');

// Helper functions for making API Calls
let helpers = {

    _nytGet: function (q, begin_date, end_date) {
        let data = qs.stringify({
            apikey: "77477d08cc0a4b84b344710a4dccb09d",
            q: q,
            sort: "newest",
            hl: true,
            fl: "web_url,snippet,headline,byline,pub_date",
            begin_date: begin_date,
            end_date: end_date
        });
        return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${data}`, {
            headers: {
                "Content-Type": "application/jsonp"
            }
        });
    },

    _mongoPost: function (postArticle) {
        let data = qs.stringify(postArticle);
        //console.log(data);
        axios.post(`/api/saved?${data}`)
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    _mongoGet: function () {
        return axios.get('/api/saved');
    },

    _mongoDelete: function (deleteArticle) {
        let data = qs.stringify(deleteArticle);
        //console.log(data);
        axios.delete(`/api/saved?${data}`)
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};

module.exports = helpers;
