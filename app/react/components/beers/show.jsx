'use strict'
var Link = require('react-router').Link;

var Reviews = require("./_reviews");
var ReviewStars = require("../shared/_review_stars");
var FlavourMap = require("./_flavour_map");

module.exports = React.createClass({
  /*
    TODO: investigate Context further: https://facebook.github.io/react/docs/context.html
    I find this to be a pretty elegant solution to this issue, where we want to pass
    objects down to an arbitrary child component. Perhaps something like Flux or Redux
    would be better for this, but for small cases this is much easier.

    Also look into this (https://github.com/rackt/react-router/issues/1369#issuecomment-113699310):
      React.cloneElement(this.props.children, { appState: this.state });

          Sounds like we could use it in place of rendering this.props.children in order to
    merge new props in.

  */
  childContextTypes: {
    beer:    React.PropTypes.object,
    reviews: React.PropTypes.array
  },

  getChildContext() {
    return {
      beer:    this.state.beer,
      reviews: this.state.reviews
    }
  },

  getInitialState() {
    return { beer: {}, brewery: {} }
  },


  ajaxGetBeer(id) {
    // TODO: refactor this url
    $.ajax({
      method: "GET",
      url: `/api/v1/beers/${id}`,
      success: (response) => {
        var beer      = response.data.attributes;
        var brewery   = { id:   response.data.relationships.brewery.data.id,
                          name: response.included[0].attributes.name
                        };
        var reviews   = response.included.filter((el)=> { return el.type === "reviews" });

        this.setState({
          beer: beer,
          brewery: brewery,
          reviews: reviews });
      },

      error: (obj, msg, err) => {
        console.log(`error in request: ${msg} / ${err}`);
      }
    })
  },

  componentDidMount() {
    this.ajaxGetBeer(this.props.params.id);
  },

  render() {
    var beerId = this.props.params.id

    var category = this.state.beer.category ? `${this.state.beer.category}` : null;
    var abv      = this.state.beer.abv      ? `${this.state.beer.abv}pct`   : null;
    var ibu      = this.state.beer.ibu      ? `${this.state.beer.ibu} ibu`  : null;

    var vitalAttributes = [category, abv, ibu]
                          .filter( function(el) { return el !== null })
                          .join("; ");

    var additionalAttributes = [];
    if (this.state.beer.available_in_growlers) {
      additionalAttributes.push(
        <p key="available_in_growlers"><span className="glyphicon glyphicon-grain"></span> available for growler fills</p>
      );
    }

    if (this.state.beer.available_in_bottles_cans) {
      additionalAttributes.push(
        <p key="available_in_bottles_cans"><span className="glyphicon glyphicon-grain"></span> available in bottles / cans</p>
      );
    }


    return (
      <div id="beer-show">
        <div id="beer-show-header">
          {/* TODO: fix thumbnail on mobile, it gets squished by the flex layout */}
          <div id="beer-show-header-thumb">
            {/* TODO: remove hard-coding on beer thumbnail image */}
            <img src="/images/hop_circle.png" className="img img-thumbnail" />
          </div>
          <div id="beer-show-header-detail">
            <div id="beer-show-header-detail-title-block">
              <h2 className="flush-with-top">
                {this.state.beer.name}
              </h2>
              <h4>
                <Link to={`/breweries/${this.state.brewery.id}`}>
                  {this.state.brewery.name}
                </Link>
              </h4>
              <p className="indent italicize lighter">
                {vitalAttributes}
              </p>
            </div>
            <ReviewStars
              rating={this.state.beer.avg_star_rating}
              numReviews={this.state.beer.num_reviews} />
            {additionalAttributes}
          </div>
          <div id="beer-show-header-actions">
            <button href="#" className="btn btn-tabby">rate</button>
            <button href="#" className="btn btn-tabby">add</button>
          </div>
        </div>

        <ul className="nav nav-tabs">
          {/* TODO: figure out a good way to abstract these URLs, maybe with some Rails-style link helpers */}
          {/* TODO: fix the case of the stuck hover state on these tabs */}
          <li><Link to={`/beers/${beerId}/flavour-map`} activeClassName={"active"}>Flavour Map</Link></li>
          <li><Link to={`/beers/${beerId}/reviews`} activeClassName={"active"}>Reviews</Link></li>
        </ul>

        <div id="nested-content">
          {this.props.children}
        </div>



      </div>
    );
  },
});
