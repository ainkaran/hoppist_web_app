'use strict'
var React = require('react');
var ReviewStars = require("../shared/_review_stars");

module.exports = React.createClass({
  handleSubmit(ev) {
    ev.preventDefault();
    debugger
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
                rating={5}
                ref="reviewStars"
                starsClassName="large-stars"
                />
            </div>

            <div className="form-group">
              <label htmlFor="colour_rating">Appearance (dark/light)</label>
              <div id="colour-gradient">
                <p id="colour-rating-display">~</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="flavour_rating">Taste (malty/hoppy)</label>
              <div id="flavour-gradient">
                <p id="flavour-rating-display">~</p>
              </div>
            </div>

            <div>
              <textarea ref="review_body" placeholder="Write a short review"></textarea>
            </div>
            <input type="submit" className="btn btn-primary" value="REVIEW" />

          </form>

        </div>
      </div>

    );
  },
});
