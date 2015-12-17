'use strict'
var React = require('react');
var Link = require('react-router').Link;
var ReviewStars = require("../shared/_review_stars");

module.exports = React.createClass({
  handleClick() {
    console.log("clicked, navigating..");
    /*
      TODO: grab the URLs from the API requests. based on the JSON API standard, each
      request can return URLs to navigate around the resources. the app could
      initially receive a response from the endpoint (/) that gives it the links
      it needs to build the routes.
    */
    var beerLink = `/ui/beers/${this.props.beer.id}`
    this.props.onNavigation({ url: beerLink});
  },

  render() {
    var beerLink = (
      <Link
        to={`/ui/beers/${this.props.beer.id}`}>
        {this.props.beer.name}
      </Link>
    );

    var breweryLink = (
      <Link
        to={`/ui/breweries/${this.props.brewery.id}`}>
        {this.props.brewery.name}
      </Link>
    );

    // TODO: replace this with proper a loading routine (see beer/show.jsx)
    var beerImgUrl = this.props.beer.images ? `${this.props.beer.images.label_image.beer_card.url}` : null;

    return (
      <div className="beer-card clearfix" onClick={this.handleClick}>

        <div className="col-image">
          <div className="img-thumbnail beer-thumb">
            <img src={beerImgUrl} style={{width: "88px", height: "auto", minHeight: "138px"}} />
          </div>
        </div>

        <div className="col-details">
          <h3 className="flush-with-top">{beerLink}</h3>
          <h5 className="lighter">{this.props.brewery.name}</h5>
          <ReviewStars
            rating={this.props.beer.avg_star_rating}
            displayReviewCount={false} />
        </div>
      </div>
    );
  }
});
