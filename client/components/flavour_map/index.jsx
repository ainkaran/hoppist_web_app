'use strict'
var $ = require('jquery');
var React = require('react');
var BeerList = require("./_beer_list");
var FlavourMapEmbedded = require("./_flavour_map_embedded");


module.exports = React.createClass({
  displayName: "FlavourMapIndex",

  MEDIA_QUERY_MEDIUM: 992, // Matches Bootstrap's 'medium' media query
  resizeTimeout: null, // for the resizeThrottler below

  getInitialState() {
    return {
             beers: [],
             breweries: [],
             flavourMapMaxWidth: 400,
             querySearchHasFocus: false,
             resultsLoading: false,
             windowWidth: window.innerWidth }
  },

  ajaxPostFlavourMapSearch(searchCoords) {
    this.props.apiRequest({
      method: 'post',
      url: 'flavour_map/search',
      data: { coords: searchCoords },
      success: (response) => {
        var newBeers  = response.data;
        var breweries = response.included;
        this.setState({ beers: newBeers, breweries: breweries, resultsLoading: false });
      },

      error: (obj, msg, err) => {
        console.log(`error in request: ${msg} / ${err}`);
      },

    })

  },

  resizeThrottler() {
    // we're throttling the resize calls using setTimeout.
    // https://developer.mozilla.org/en-US/docs/Web/Events/resize
    if (!this.resizeTimeout) {
      this.resizeTimeout = setTimeout(()=> {
        this.resizeTimeout = null;
        this.handleResize();
      }, 66);
    }
  },

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  },

  handleFormSubmit(ev) {
    ev.preventDefault();
  },

  getSearch(term) {
    this.setState({ resultsLoading: true });
    this.props.apiRequest({
      url: 'search',
      method: 'get',
      data: {term: term},
      success: (response)=> {
        var newBeers  = response.data;
        var breweries = response.included;
        this.setState({ beers: newBeers, breweries: breweries, resultsLoading: false, searchTerm: term });
      }
    });
  },

  componentDidMount() {
     window.addEventListener('resize', this.resizeThrottler);
  },

  componentWillUnmount() {
     window.removeEventListener('resize', this.resizeThrottler);
  },

  handleDragStop(newCoords) {
    this.setState({ resultsLoading: true });
    this.ajaxPostFlavourMapSearch(newCoords);
  },

  handleNavigation(params) {
    var url = params["url"];
    if (url) { this.props.history.push(url); }
  },

  handleQueryEntry(ev) {
    var currentQuery = this.refs.query.value;

    /* TODO: tried using fat-arrow syntax here, but 'this' becomes Window. why? */
    setTimeout(function(prevQuery) {
      var currentQuery = this.refs.query.value;
      if (currentQuery === prevQuery && currentQuery !== "") {
        this.getSearch(currentQuery);
      }
    }.bind(this), 800, currentQuery);

  },

  toggleQueryInput() {
    this.setState({ querySearchHasFocus: !this.state.querySearchHasFocus });
  },

  render: function() {
    var loading = this.state.resultsLoading;
    var classes = ["center-block","img","img-thumbnail"];
    var placeholder = this.state.querySearchHasFocus ? "" : "or, search by beer/brewery:";
    // disabled the fixed flavour map when the search bar was added
    // if (this.state.windowWidth >= this.MEDIA_QUERY_MEDIUM) {
    //   classes.push("fixed");
    // }

    // TODO: 1.6 is the current aspect ratio of the flavour map; refactor this magic number
    return (
      <div className="row" style={{minHeight: this.state.flavourMapMaxWidth/1.6}}>
        <div className="col-sm-6">
          <FlavourMapEmbedded
            className={classes.join(" ")}
            isDraggable={true}
            maxWidth={this.state.flavourMapMaxWidth}
            onDragStop={this.handleDragStop}
            targetPos={{x: 6, y: 6}}
            />
          <br />
          {/*<p className="text-center italicize lighter">or, search by beer/brewery:</p>*/}

        {/* Beer name search form */}
          <form onSubmit={this.handleFormSubmit} className="center-block" style={{maxWidth: this.state.flavourMapMaxWidth}}>
            <div className="form-group">
              <input
                className="form-control"
                name="query"
                onBlur={this.toggleQueryInput}
                onFocus={this.toggleQueryInput}
                onChange={this.handleQueryEntry}
                placeholder={placeholder}
                ref="query"
                type="text"
                />
            </div>
            {/*
            <div className="form-group text-center">
              <input className="btn btn-default" type="submit" value="SEARCH" />
            </div>
            */}
          </form>

        </div>
        <div className="col-sm-6">
          <BeerList
            loading={loading}
            beers={this.state.beers}
            breweries={this.state.breweries}
            onNavigation={this.handleNavigation}
            searchTerm={this.state.searchTerm}
            />
        </div>
      </div>
    );
  },
});
