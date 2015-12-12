'use strict'

module.exports = React.createClass({
  render: function() {
    return (
      <div id="reviews">

        {/* example of a single review: */}
        <div className="beer-card clearfix">
          <div className="col-review">
            <h5><a href="#">Alex T.</a> <i>on June 15, 2015</i></h5>
            <div className="review-stars">
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </div>
            <p>This beer is one of my favourites, really nice session ale with a crisp flavour. Would recommend...</p>
          </div>
        </div>

      </div>
    );
  }
});
