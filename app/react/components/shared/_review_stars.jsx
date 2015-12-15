'use strict'
var React = require('react');
module.exports = React.createClass({
  propTypes: {
    rating: React.PropTypes.number,
    numReviews: React.PropTypes.number,
    displayReviewCount: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      rating: null,
      numReviews: null,
      displayReviewCount: true
    }
  },


  // TODO: replace glyphicons with SVGs so we're not having to hack glyphicons.
  // TODO: refactor the star calculation, it's ugly as sin
  render() {
    var rating = this.props.rating;
    var stars = [];
    if (rating > 0) {
      for (var i = 0; i < parseInt(rating); i++) {
        stars.push(
          <span className="glyphicon glyphicon-star" key={i}></span>
        );
      };
    }

    // add a half star if needed
    var x = (rating % 1);
    if (x > 0.95) {
      stars.push(<span className="glyphicon glyphicon-star" key={'xtra'}></span>);
    } else if (x > 0.49) {
      stars.push(<span className="glyphicon glyphicon-star half-star" key={'xtra'}></span>);
    }

    var displayNumReviews = this.props.numReviews > 0 ? `out of ${this.props.numReviews} reviews` : `no reviews yet.`

    return (
      <div className="review-stars" title={`${rating}/5`}>
        {stars}
        { this.props.displayReviewCount ? <p className="indent italicize lighter">{displayNumReviews}</p> : ""}
      </div>
    );
  },
});
