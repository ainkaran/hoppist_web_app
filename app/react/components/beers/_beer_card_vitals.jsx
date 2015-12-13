'use strict'
var Link = require('react-router').Link;

module.exports = React.createClass({
  render() {
    // TODO: think about url abstraction. maybe everything could be in a global object
    var beerLink = (
      <Link
        to={`/breweries/${this.props.brewery.id}/beers/${this.props.beer.id}`}>
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
      <div className="beer-card clearfix">

        <div className="col-image">
          <div className="img-thumbnail beer-thumb">
            <img src="/images/hop_circle.png" width="88" height="105" />
          </div>
        </div>

        <div className="col-details">
          <h5>{beerLink} <em>by</em> {breweryLink}</h5>
          <p className="indent italicize lighter">ale; 5pct; 45 ibu</p>
          <div className="review-stars">
            <span className="glyphicon glyphicon-star"></span>
            <span className="glyphicon glyphicon-star"></span>
            <span className="glyphicon glyphicon-star"></span>
            <span className="glyphicon glyphicon-star"></span>
            <span className="glyphicon glyphicon-star"></span>
          </div>
        </div>
      </div>
    );
  }
});
