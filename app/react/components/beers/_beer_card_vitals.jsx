'use strict'
var Link = require('react-router').Link;
var ReviewStars = require("../shared/_review_stars");

module.exports = React.createClass({
  handleClick() {
    console.log("clicked, navigating..");
    // TODO: think about url abstraction. maybe everything could be in a global object
    // TODO: friendly URLs
    var beerLink = `/beers/${this.props.beer.id}`
    this.props.onNavigation({ url: beerLink});
  },

  render() {
    var beerLink = (
      <Link
        to={`/beers/${this.props.beer.id}`}>
        {this.props.beer.attributes.name}
      </Link>
    );

    var breweryLink = (
      <Link
        to={`/breweries/${this.props.brewery.id}`}>
        {this.props.brewery.attributes.name}
      </Link>
    );

    return (
      <div className="beer-card clearfix" onClick={this.handleClick}>

        <div className="col-image">
          <div className="img-thumbnail beer-thumb">
            <img src="/images/hop_circle.png" width="88" height="105" />
          </div>
        </div>

        <div className="col-details">
          <h3 className="flush-with-top">{beerLink}</h3>
          <h5 className="lighter">{this.props.brewery.attributes.name}</h5>
          <ReviewStars
            rating={this.props.beer.attributes.avg_star_rating}
            displayReviewCount={false} />
        </div>
      </div>
    );
  }
});
