'use strict'
var $ = require('jquery');
var React = require('react');
var ReviewStars = require('../shared/_review_stars');
var Slider = require('./_slider');


module.exports = React.createClass({
  displayName: "ReviewFormInline",

  getInitialState() {
    return { reviews: [], errors: {} }
  },

  handleSubmit(ev) {
    ev.preventDefault();
    // set the star rating to 'undefined' unless a value has been chosen
    var beer          = this.props.beer
    var starRating    = this.refs.reviewStars.state.value > 0 ? this.refs.reviewStars.state.value : undefined;
    var colourRating  = this.refs.reviewColourRating.state.value;
    var flavourRating = this.refs.reviewFlavourRating.state.value;
    var body          = this.refs.reviewBody.value

    var review = {
      author_id:       0,
      author_name:     "...",
      beer_id:         beer.id,
      body:            body,
      colour_rating:   colourRating,
      date:            "...",
      flavour_rating:  flavourRating,
      star_rating:     starRating
    };

    /* TODO: React challenge: there's some duplicated work here because we're recreating Rails'
       validation for the review. Is there a way around this? */
    var valid = this.performValidations(review);

    // TODO: add the real date, author_name, author_id to review object
    if (valid) {
      this.props.onReviewSubmit(review);
    }
  },

  performValidations(review) {
    const BODY_MIN_LENGTH = 10;
    var errors = {};

    /* star must be present always */
    if (!review.star_rating) {
      errors.star = 'Each review requires a star rating. Other fields are optional.';
    }

    /* if the body is present it, must be longer than the min */
    if (review.body && review.body.length < BODY_MIN_LENGTH) {
      errors.body = `must be more than ${BODY_MIN_LENGTH} characters`;
    }

    /* if the flavour rating OR the colour rating is present, then BOTH
       should be present */
    if (review.flavour_rating || review.colour_rating) {
      if (!review.flavour_rating || !review.colour_rating) {
        errors.colour_flavour = "both must be present";
      }
    }

    if (Object.keys(errors).length === 0) {
      return true;
    } else {
      this.setState({errors: errors});
      return false;
    }
  },

  render() {
    var errorGeneral = this.state.errors.general ? (<p><span className="errorText">Uh-oh. An unknown error occured.</span></p>) : null;
    // TODO: there's a bug that sets the star rating to 5 after reloading the page with an error.
    var errorStar = this.state.errors.star ? (<p><span className="errorText">{this.state.errors.star}</span></p>) : null;
    var errorBody = this.state.errors.body ? (<span className="errorText">Review {this.state.errors.body}</span>) : null;
    var errorColourFlavour = this.state.errors.colour_flavour
                             ? (<p><span className="errorText">
                                If you'd like to rate the appearance and flavour, you must rate <em>both</em>.
                              </span></p>)
                             : null;

    return (
      <div className="beer-card clearfix">
        <div className="col-review">
          <h3 className="flush-with-top lighter italicize">
            <em>What do you think of {this.props.beer.name}?</em>
          </h3>

          {errorGeneral}

          <form onSubmit={this.handleSubmit}>
            <div>
              <ReviewStars
                displayReviewCount={false}
                interactive={true}
                ref="reviewStars"
                starsClassName="large-stars"
                />
              {errorStar}
            </div>

            <Slider
              ref="reviewColourRating"
              title="Appearance (dark/light)"
              type="colour-gradient" />

            <Slider
              ref="reviewFlavourRating"
              title="Flavour (malty/hoppy)"
              type="flavour-gradient" />

            {errorColourFlavour}

            <div>
              <textarea ref="reviewBody" placeholder="Write a short review"></textarea>
              {errorBody}
            </div>
            <input type="submit" className="btn btn-primary" value="REVIEW" />

          </form>

        </div>
      </div>

    );
  },
});
