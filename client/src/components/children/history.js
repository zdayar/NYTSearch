import React, {Component} from "react";
import Masonry from "react-masonry-component";

class History extends Component {

    componentDidMount() {
        //console.log("history.js: component did mount - call _mongoGet");
        this.props._mongoGet();
    }

    _showMongo = () => {
        //console.log("history.js: _showMongo - there are ", this.props.articlesMongo.length, " saved articles. Show them.");
        return this.props.articlesMongo.map((itemObj, index) => {
            return (
                    <div className="col col-sm-3 col-result-body" key={index} data-id={itemObj._id}>
                        <h4><a href={itemObj.web_url} target="_blank">{itemObj.headline}</a></h4>
                        <p>{itemObj.pub_date}</p>
                        <p>{itemObj.byline}</p>
                        <p>... {itemObj.snippet}...</p>
                        <button
                                type="button"
                                className="btn btn-large btn-this"
                                onClick={() => {
                                    this.props._mongoDelete({_id: itemObj._id})
                                }}>Delete Article
                        </button>
                        <br/>
                    </div>
            );
        });
    }

    render() {
        return (
                <div className="container">
                    <div className="row row-result-title">
                        <div className="col col-sm-12 col-result-title">
                            <h2>You have saved {this.props.articlesMongo.length} articles</h2>
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
                        {this._showMongo()}
                    </Masonry>{/* end row */}
                    {/* end container */}
                </div>
        );
    }
}

export default History;