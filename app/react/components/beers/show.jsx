'use strict'
var React = require('react');
var Link = require('react-router').Link;

var Reviews = require("./_reviews");
var ReviewStars = require("../shared/_review_stars");
var FlavourMap = require("./_flavour_map");

module.exports = React.createClass({
  displayName: 'BeerShow',

  getInitialState() {
    return { beer: {}, brewery: {} }
  },

  componentDidMount() {
    this.getBeer(this.props.params.id);
  },

  handleReviewSubmit(review) {
    // eager loading
    var newReview = { id: `tmp_${Math.floor(Math.random()*1000)}`, attributes: review };
    var prevReviews = this.state.reviews;
    var nextReviews = [newReview].concat(prevReviews);
    this.setState({ reviews: nextReviews })

    this.props.apiRequest({
      method: 'post',
      url: 'reviews',
      data: {review: review},
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
    var breweries = response.included.filter((el)=> { return el.type === "breweries" });
    var reviews   = response.included.filter((el)=> { return el.type === "reviews"   });
    var brewery   = { id:   response.data.relationships.brewery.data.id,
                      name: breweries[0].attributes.name,
                      url:  breweries[0].attributes.url
                    };

    this.setState({
      beer: beer,
      brewery: brewery,
      reviews: reviews });
  },

  getBeer(id) {
    this.props.apiRequest({
      url: `beers/${id}`,
      method: 'get',
      success: (response)=> {
        this.hydrateBeerData(response)
      }
    })
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
        signedIn: this.props.signedIn,
        currentUser: this.props.currentUser,
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
                by <a href={this.state.brewery.url}>{this.state.brewery.name}</a>
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
        </div>

        <ul className="nav nav-tabs">
          <li><a className="active">Reviews</a></li>
        </ul>

        <div id="nested-content">
          {/*TODO: look into spread for this on this.props.children */}
          {newChildren}
        </div>



      </div>
    );
  },
});
