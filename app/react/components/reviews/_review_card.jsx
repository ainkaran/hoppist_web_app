'use strict'
var Link = require('react-router').Link;
var ReviewStars = require("../shared/_review_stars");

module.exports = React.createClass({
  propTypes: {
    review:          React.PropTypes.object
  },

  render() {

    return (
      <div className="beer-card clearfix">
        <div className="col-review">
          <h5>
            <Link to={`/users/${this.props.review.author_id}`}>{this.props.review.author_name}</Link> on <em>{this.props.review.date}</em>
          </h5>

          <ReviewStars
            rating={this.props.review.star_rating}
            displayReviewCount={false} />

          {/* TODO: allow markdown formatting or something here */}
          <p>{this.props.review.body}</p>
        </div>
      </div>
    );
  },
});
