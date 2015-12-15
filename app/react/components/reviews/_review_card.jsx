'use strict'
var React = require('react');
var Link = require('react-router').Link;
var ReviewStars = require("../shared/_review_stars");

module.exports = React.createClass({
  propTypes: {
    review:          React.PropTypes.object
  },

  render() {
    var flavour_profile;

    if (this.props.review.colour_rating && this.props.review.flavour_rating) {
      flavour_profile  = (
        <p className="lightest small italicize" style={{marginBottom: 0}}>
          LIGHTNESS: {this.props.review.colour_rating} / 12
          &nbsp; &middot; &nbsp;
          HOPPINESS: {this.props.review.flavour_rating} / 12
        </p>
      );
    }

    return (
      <div className="beer-card clearfix">
        <div className="col-review">
          <h5 className="flush-with-top">
            <Link to={`/ui/users/${this.props.review.author_id}`}>{this.props.review.author_name}</Link> <span className="lighter">on <em>{this.props.review.date}</em></span>
          </h5>

          <ReviewStars
            rating={this.props.review.star_rating}
            displayReviewCount={false} />

          {/* TODO: allow markdown formatting or something here */}
          <p>{this.props.review.body}</p>
          {flavour_profile}
        </div>
      </div>
    );
  },
});
