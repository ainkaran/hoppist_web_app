'use strict'
var React = require('react');
var ReviewStars = require('../shared/_review_stars');
var Slider = require('./_slider');

module.exports = React.createClass({
  handleSubmit(ev) {
    ev.preventDefault();
    // set the star rating to 'undefined' unless a value has been chosen
    var starRating    = this.refs.reviewStars.state.value > 0 ? this.refs.reviewStars.state.value : undefined;
    var colourRating  = this.refs.reviewColourRating.state.value;
    var flavourRating = this.refs.reviewFlavourRating.state.value;
    var body          = this.refs.reviewBody.value
    // TODO perform validation
    // TODO submit to server and handle response. should this be done by app?
  },

  render() {
    return (
      <div className="beer-card clearfix">
        <div className="col-review">
          <h5 className="flush-with-top lighter italicize">
            <em>What do you think of Beer Name?</em>
          </h5>

          <form onSubmit={this.handleSubmit}>
            <div>
              <ReviewStars
                displayReviewCount={false}
                interactive={true}
                ref="reviewStars"
                starsClassName="large-stars"
                />
            </div>

            <Slider
              ref="reviewColourRating"
              title="Appearance (dark/light)"
              type="colour-gradient" />

            <Slider
              ref="reviewFlavourRating"
              title="Appearance (dark/light)"
              type="flavour-gradient" />

            <div>
              <textarea ref="reviewBody" placeholder="Write a short review"></textarea>
            </div>
            <input type="submit" className="btn btn-primary" value="REVIEW" />

          </form>

        </div>
      </div>

    );
  },
});
