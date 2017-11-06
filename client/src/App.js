import React, {Component} from "react";
import Search from "./components/children/search";
import Results from "./components/children/results";
import History from "./components/children/history";
import helpers from "./utils/helpers";

class App extends Component {
    state = {
        articlesNyt: [],
        articlesMongo: [],
        toggle: false
    };

    _toggleResults = () => {
        this.setState({
            toggle: true
        });
    };

    _nytGet = (q, begin_date, end_date) => {
        this.setState({
            articlesNyt: []
        });
        helpers._nytGet(q, begin_date, end_date)
        .then(function cbres(result) {
            let nytRes = result.data.response.docs;
            //console.log("App.js _nytGet: scraped NYT articles: ", nytRes.length + " total.");
            nytRes.forEach((itemObj) => {
                this.setState({
                    articlesNyt: [
                        ...this.state.articlesNyt,
                        {
                            web_url: itemObj.web_url,
                            snippet: itemObj.snippet.replace(/(<([^>]+)>)/ig, ""),
                            headline: itemObj.headline.main,
                            byline: itemObj.byline.original,
                            pub_date: itemObj.pub_date
                        }
                    ]
                }); //setState
            }); //forEach
        }.bind(this)) //then cbres
    }; // _nytGet

    _mongoPost = (postArticle) => {
        //console.log("App.js _mongoPost - saving an article");
        helpers._mongoPost(postArticle);
        setTimeout(this._mongoGet, 500);
    };

    _mongoGet = () => {
        this.setState({
            articlesMongo: []
        });
        helpers._mongoGet()
        .then(function cbres(result) {
            //console.log("App.js _mongoGet: got SAVED articles: ", result.data.length + " total.");
            result.data.forEach((itemObj) => {
                this.setState({
                    articlesMongo: [
                        ...this.state.articlesMongo,
                        {
                            _id: itemObj._id,
                            web_url: itemObj.web_url,
                            snippet: itemObj.snippet,
                            headline: itemObj.headline,
                            byline: itemObj.byline,
                            pub_date: itemObj.pub_date,
                            date_saved: itemObj.date_saved
                        }
                    ]
                }); //setState
            }); //forEach
        }.bind(this)) //then cbres
    };

    _mongoDelete = (deleteArticle) => {
        //console.log("App.js _mongoPost - deleting a saved article");
        helpers._mongoDelete(deleteArticle)
        setTimeout(this._mongoGet, 500);
    };

    render() {
        return (
                <div>
                    <div className="container container-title">
                        <div className="row">
                            <div className="col col-sm-12">
                                <h2>NYT Search</h2>
                            </div>
                            {/* end col-sm-12 */}
                        </div>
                        {/* end row */}
                    </div>
                    {/* end inner container */}

                    <Search
                            _nytGet={this._nytGet}
                            _toggleResults={this._toggleResults}
                    />
                    <Results
                            articlesNyt={this.state.articlesNyt}
                            _mongoPost={this._mongoPost}
                            toggle={this.state.toggle}
                    />
                    <History
                            articlesMongo={this.state.articlesMongo}
                            _mongoDelete={this._mongoDelete}
                            _mongoGet={this._mongoGet}
                    />
                    {/* end overall container */}
                </div>
        );
    }
}

export default App;

