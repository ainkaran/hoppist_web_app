'use strict'

module.exports = React.createClass({
  propTypes: {
    displayReviewCount: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      rating: 0,
      displayReviewCount: true
    }
  },


  // TODO: replace glyphicons with SVGs so we're not having to hack glyphicons.
  // TODO: refactor the star calculation, it's ugly as sin
  render() {
    var rating = this.props.rating;
    var stars = [];
    if (rating !== undefined) {
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

    var num_reviews = stars.length > 0 ? `out of ${stars.length} reviews` : `no reviews yet.`

    return (
      <div className="review-stars" title={`${rating}/5`}>
        {stars}
        { this.props.displayReviewCount ? <p className="indent italicize lighter">{num_reviews}</p> : ""}
      </div>
    );
  },
});
