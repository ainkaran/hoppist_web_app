'use strict'
var React = require('react');
var Review = require("../reviews/_review_card");
var ReviewFormInline = require("../reviews/_form_inline");

module.exports = React.createClass({
  displayName: "BeerReviews",

  getInitialState() {
    return { showNewReviewForm: true }
  },

  handleReviewSubmit(review) {
    this.props.onReviewSubmit(review)
    this.setState({ showNewReviewForm: false })
  },

  render() {
    var newReview;
    if (this.state.showNewReviewForm) {
      newReview = (<ReviewFormInline
          beer={this.props.beer}
          onReviewSubmit={this.handleReviewSubmit}
          />
        );
    }

    var reviews = [];

    if (this.props.reviews) {
      reviews = this.props.reviews.map((review)=>{
        return (<Review
                  review={review.attributes}
                  key={review.id}/>);
      });
    } else {
      reviews = (<p className="lighter text-center"><em>No reviews yet.</em></p>);
    }

    return (
      <div id="reviews">
        {newReview}
        {reviews}
      </div>
    );
  },

});
