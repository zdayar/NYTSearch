import React, { Component } from "react";
import Masonry from "react-masonry-component";

class Results extends Component {

    _showNyt = (articles) => {
        //console.log("Results.js: _showNyt - show NYT search result articles - ", articles.length, " total.");
        return articles.map((itemObj, index) => {
            return (
                    <div className="col col-sm-3 col-result-body grid-item" key={index}>
                        <h4><a href={itemObj.web_url} target="_blank">{itemObj.headline}</a></h4>
                        <p>{itemObj.pub_date}</p>
                        <p>{itemObj.byline}</p>
                        <p>... {itemObj.snippet}...</p>
                        <button
                                type="button"
                                className="btn btn-large btn-save btn-this"
                                onClick={() => {
                                    this.props._mongoPost(itemObj)
                                }}>Save Article
                        </button>
                        <br/>
                    </div>
            );
        });
    };

    _showResults = (toggle) => {
        if (toggle === false) {
            //console.log("Results.js: _showResults - show empty results div");
            return (
                    <div></div>
            );
        } else if (toggle === true) {
            //console.log("Results.js: _showResults - show content for results div - this.props.articlesNyt.length is ", this.props.articlesNyt.length);
            return (
                    <div className="container">
                        <div className="row row-result-title grid">
                            <div className="col col-sm-12 col-result-title">
                                <h2>Your search returned {this.props.articlesNyt.length} articles</h2>
                            </div>
                            {/* end col-sm-12 */}
                        </div>
                        {/* end row */}
                        <Masonry
                                className={'row'} // default ''
                                elementType={'div'} // default 'div'
                                disableImagesLoaded={false} // default false
                                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        >
                            {this._showNyt(this.props.articlesNyt)}
                        </Masonry>
                        {/* end container */}
                    </div>
            );
        }
    };

    render() {
        return (
                <div>
                    {this._showResults(this.props.toggle)}
                </div>
        );
    }
}

export default Results;