'use strict'
var $ = require('jquery');
var React = require('react');
var Link = require('react-router').Link;

var Reviews = require("./_reviews");
var ReviewStars = require("../shared/_review_stars");
var FlavourMap = require("./_flavour_map");

module.exports = React.createClass({

  getInitialState() {
    return { beer: {}, brewery: {} }
  },

  handleReviewSubmit(review) {
    this.ajaxPostReviewSubmit(review);
  },

  ajaxPostReviewSubmit(review) {
    // eager loading
    var newReview = { id: `tmp_${Math.floor(Math.random()*1000)}`, attributes: review };
    var prevReviews = this.state.reviews;
    var nextReviews = [newReview].concat(prevReviews);
    this.setState({ reviews: nextReviews })

    $.ajax({
      method: "POST",
      url: "/api/v1/reviews",
      data: { review: review },
      success: (response) => {
        this.hydrateBeerData(response);
      },

      error: (obj, msg, err) => {
        // TODO better error handling
        debugger
        var errors = obj.responseJSON;
        if (errors.beer || errors.user) {
          errors.general = true
        }

        this.setState({ errors })
      }
    });
  },

  /* since we're populating this from the initial GET request AND potentially
     a new review submission, the logic goes here. */
  hydrateBeerData(response) {
    var beer      = response.data.attributes;
    beer.id       = response.data.id;
    var brewery   = { id:   response.data.relationships.brewery.data.id,
                      name: response.included[0].attributes.name
                    };
    var reviews   = response.included.filter((el)=> { return el.type === "reviews" });

    this.setState({
      beer: beer,
      brewery: brewery,
      reviews: reviews });
  },

  ajaxGetBeer(id) {
    // TODO: refactor this url
    $.ajax({
      method: "GET",
      url: `/api/v1/beers/${id}`,
      success: (response) => {
        this.hydrateBeerData(response);
      },

      error: (obj, msg, err) => {
        // TODO: improve this
        alert("Uh oh! Error submiting to server. Check the logs.")
        console.log(`error in request: ${msg} / ${err}`);
      }
    })
  },

  componentDidMount() {
    this.ajaxGetBeer(this.props.params.id);
  },

  render() {
    /* TODO: work out a method of using a loading screen to hide some of the ajax calls.
       this would allow us to improve some of this code slightly; perhaps we could
       even just create a state object `hasLoadedResource` or something...
    */
    var beerId     = this.props.params.id
    var beerImgUrl = this.state.beer.images ? `${this.state.beer.images.label_image.profile.url}` : null;
    var category   = this.state.beer.category ? `${this.state.beer.category}` : null;
    var abv        = this.state.beer.abv      ? `${this.state.beer.abv}pct`   : null;
    var ibu        = this.state.beer.ibu      ? `${this.state.beer.ibu} ibu`  : null;

    var vitalAttributes = [category, abv, ibu]
                          .filter( function(el) { return el !== null })
                          .join("; ");

    var additionalAttributes = [];
    if (this.state.beer.available_in_growlers) {
      additionalAttributes.push(
        <p key="available_in_growlers">
          <span className="glyphicon glyphicon-grain"></span> available for growler fills
        </p>
      );
    }

    if (this.state.beer.available_in_bottles_cans) {
      additionalAttributes.push(
        <p key="available_in_bottles_cans">
          <span className="glyphicon glyphicon-grain"></span> available in bottles / cans
        </p>
      );
    }

    // A solution for passing props down to the children, without relying on Context (or Redux/Flux)
    // See https://facebook.github.io/react/blog/2015/03/03/react-v0.13-rc2.html#react.cloneelement
    var newChildren = React.Children.map(this.props.children, (child)=> {
      return React.cloneElement(child, {
        beer: this.state.beer,
        reviews: this.state.reviews,
        onReviewSubmit: this.handleReviewSubmit });
    });

    return (
      <div id="beer-show">
        <div id="beer-show-header">
          {/* TODO: fix thumbnail on mobile, it gets squished by the flex layout */}
          <div id="beer-show-header-thumb">
            <img src={`${beerImgUrl}`} className="img img-thumbnail" />
          </div>
          <div id="beer-show-header-detail">
            <div id="beer-show-header-detail-title-block">
              <h2 className="flush-with-top">
                {this.state.beer.name}
              </h2>
              <h4>
                <Link to={`/ui/breweries/${this.state.brewery.id}`}>
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
            <Link to={`/ui/beers/${beerId}/reviews`} className="btn btn-tabby">review</Link>
            <button href="#" className="btn btn-tabby">add</button>
          </div>
        </div>

        <ul className="nav nav-tabs">
          {/* TODO: figure out a good way to abstract these URLs, maybe with some Rails-style link helpers */}
          {/* TODO: fix the case of the stuck hover state on these tabs */}
          <li><Link to={`/ui/beers/${beerId}/flavour-map`} activeClassName={"active"}>Flavour Map</Link></li>
          <li><Link to={`/ui/beers/${beerId}/reviews`} activeClassName={"active"}>Reviews</Link></li>
        </ul>

        <div id="nested-content">
          {/*TODO: look into spread for this on this.props.children */}
          {newChildren}
        </div>



      </div>
    );
  },
});
