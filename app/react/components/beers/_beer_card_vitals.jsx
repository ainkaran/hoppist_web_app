'use strict'
var Link = require('react-router').Link;

module.exports = React.createClass({
  handleClick() {
    console.log("clicked");
  },

  render() {
    // TODO: think about url abstraction. maybe everything could be in a global object
    var beerLink = `/breweries/${this.props.brewery.id}/beers/${this.props.beer.id}`

    return (
      <div className="beer-card clearfix" onClick={this.handleClick}>

        <div className="col-image">
          <div className="img-thumbnail beer-thumb">
            <img src="/images/hop_circle.png" width="88" height="105" />
          </div>
        </div>

        <div className="col-details">
          <h3 className="flush-with-top">{this.props.beer.attributes.name}</h3>
          <h5 className="lighter">{this.props.brewery.attributes.name}</h5>
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
