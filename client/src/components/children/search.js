import React, {Component} from "react";

class Search extends Component {
    state = {
        q: "",
        begin_date: "19500101",
        end_date: "20171231",
    };

    _handleChangeQ = (event) => {
        this.setState({
            q: event.target.value,
        });
    };

    _handleChangeB_D = (event) => {
        this.setState({
            begin_date: event.target.value
        });
    };

    _handleChangeE_D = (event) => {
        this.setState({
            end_date: event.target.value
        });
    };


    _handleSubmit = (e) => {
        e.preventDefault();
        //console.log("Search.js: search button clicked");
        this.props._nytGet(this.state.q, this.state.begin_date, this.state.end_date);
        this.setState({
            q: "",
            begin_date: "19500101",
            end_date: "20171231",
        });
        this.props._toggleResults();
    };

    render() {
        return (

                <div className="container">
                    <div className="row row-search-results">
                        <form onSubmit={this._handleSubmit}>
                            <div className="col col-sm-3 col-search-results">
                                <label htmlFor="query">Search for</label><br/>
                                <input
                                        value={this.state.q}
                                        type="text"
                                        id="query"
                                        onChange={this._handleChangeQ}
                                />
                            </div>
                            {/* /col-sm-3 */}
                            <div className="col col-sm-3 col-search-results">
                                <label htmlFor="begin-date">Earliest Date</label><br/>
                                <input
                                        value={this.state.begin_date}
                                        type="text"
                                        id="begin-date"
                                        onChange={this._handleChangeB_D}
                                />
                            </div>
                            {/* /col-sm-3 */}
                            <div className="col col-sm-3 col-search-results">
                                <label htmlFor="end-date">Latest Date</label><br/>
                                <input
                                        value={this.state.end_date}
                                        type="text"
                                        id="end-date"
                                        onChange={this._handleChangeE_D}
                                />
                            </div>
                            {/* /col-sm-3 */}
                            <div className="col col-sm-3 col-search-results">
                                <br/>
                                <button
                                        type="submit"
                                        className="btn btn-large btn-this"
                                        id="submit-button"
                                >
                                    Search Articles
                                </button>
                                <br/>
                            </div>
                            {/* end col-sm-3 */}
                        </form>
                    </div>
                    {/* end row */}
                    {/* end container */}
                </div>
        );
    }
}

export default Search;