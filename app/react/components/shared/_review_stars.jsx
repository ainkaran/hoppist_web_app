'use strict'
var React = require('react');

module.exports = React.createClass({
  propTypes: {
    displayReviewCount: React.PropTypes.bool,
    interactive: React.PropTypes.bool,
    numReviews: React.PropTypes.number,
    rating: React.PropTypes.number,
    starsClassName: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      displayReviewCount: true,
      interactive: false,
      numReviews: null,
      rating: null,
      starsClassName: ""
    }
  },

  getInitialState() {
    return { value: 0 }
  },

  handleStarClick(ev) {
    var starClicked = parseInt(ev.target.id,10);
    this.setState({ value: starClicked });
  },

  renderStars(rating) {
    var classes  = ['glyphicon','glyphicon-star'];
    if (this.props.starsClassName) {
      classes.push(`${this.props.starsClassName}`)
    }

    var numStars = parseInt(rating, 10);
    var stars    = [];

    if (this.props.interactive) {
      numStars = 5;
    }

    for (var i = 0; i < numStars; i++) {
      var state;

      if ((i+1) > this.state.value) {
        state = 'unfilled';
      } else {
        state = 'filled';
      }

      stars.push(
        <span
          className={`${classes.join(" ")} ${state}`}
          key={i}
          onClick={this.props.interactive ? this.handleStarClick : null}
          id={i+1}
          ></span>
      );
    };

    // add a half star if needed
    var x = (rating % 1);
    if (x > 0.95) {
      stars.push(<span className={classes.join(" ")} key={'xtra'}></span>);
    } else if (x > 0.49) {
      classes.push('half-star')
      stars.push(<span className={classes.join(" ")} key={'xtra'}></span>);
    }


    return stars;
  },


  // TODO: replace glyphicons with SVGs so we're not having to hack glyphicons.
  // TODO: refactor the star calculation, it's ugly as sin
  render() {
    var rating = this.props.rating;
    var stars = this.renderStars(rating);

    var displayNumReviews = this.props.numReviews > 0 ? `out of ${this.props.numReviews} reviews` : `no reviews yet.`

    return (
      <div className="review-stars" title={`${rating}/5`}>
        {stars}
        { this.props.displayReviewCount ? <p className="indent italicize lighter">{displayNumReviews}</p> : ""}
      </div>
    );
  },
});
