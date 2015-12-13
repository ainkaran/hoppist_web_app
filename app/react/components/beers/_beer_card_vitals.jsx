'use strict'

module.exports = React.createClass({
  render() {
    return (
      <div className="beer-card clearfix">

        <div className="col-image">
          <div className="img-thumbnail beer-thumb">
            <img src="/images/hop_circle.png" width="88" height="105" />
          </div>
        </div>

        <div className="col-details">
          <h5><a href="#">{this.props.beer.attributes.name}</a> <i>by</i> <a href="#">brewery goes here</a></h5>
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
