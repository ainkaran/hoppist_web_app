'use strict'
var Review = require("../reviews/_review_card");

module.exports = React.createClass({
  contextTypes: {
    reviews: React.PropTypes.array
  },

  render() {
    var reviews = [];

    if (this.context.reviews) {
      reviews = this.context.reviews.map((review)=>{
        return (<Review review={review.attributes} key={review.id}/>);
      });
    } else {
      reviews = (<p className="lighter text-center"><em>No reviews yet.</em></p>);
    }

    return (
      <div id="reviews">
        {reviews}
      </div>
    );
  },

});
