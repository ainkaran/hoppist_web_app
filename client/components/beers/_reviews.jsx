'use strict'
var React = require('react');
var Review = require("../reviews/_review_card");
var ReviewFormInline = require("../reviews/_form_inline");
var Link = require('react-router').Link;

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
    var currentUserReview = this.props.reviews.filter((review)=> {
      /* NOTE: intentionally using == here instead of ===, to avoid subtle type errors */
      return review.attributes.author_id == this.props.currentUser.id
    });

    if (this.state.showNewReviewForm && currentUserReview.length === 0) {
      if (this.props.signedIn) {
        newReview = (<ReviewFormInline
            beer={this.props.beer}
            onReviewSubmit={this.handleReviewSubmit}
            />);
      } else {
        newReview = (
          <h4 className="lighter text-center"><Link to="/sign_in">Sign in</Link> to post a review.</h4>
        )
      }
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
