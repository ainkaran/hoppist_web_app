'use strict'
var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render() {
    return (
      <div id="beer-show">
        <div id="beer-show-header">
          {/* TODO: fix thumbnail on mobile, it gets squished by the flex layout */}
          <div id="beer-show-header-thumb">
            {/* TODO: remove hard-coding on beer thumbnail image */}
            <img src="/images/hop_circle.png" className="img img-thumbnail" />
          </div>
          <div id="beer-show-header-detail">
            <div id="beer-show-header-detail-title-block">
              <h2 className="flush-with-top">Big Long Beer Name It’s Great</h2>
              <h4><a href="#">Phillips Brewing Co.</a></h4>
              <p className="indent italicize lighter">ale; 5pct; 45 ibu</p>
            </div>
            <div className="review-stars">
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </div>
            <p className="indent italicize lighter">out of 15 reviews</p>
            <p><span className="glyphicon glyphicon-grain"></span> growler fills</p>
            <p><span className="glyphicon glyphicon-grain"></span> bottles / cans</p>
          </div>
          <div id="beer-show-header-actions">
            <button href="#" className="btn btn-tabby">rate</button>
            <button href="#" className="btn btn-tabby">add</button>
          </div>
        </div>

        <ul className="nav nav-tabs">
          <li><a href="#">Flavour Map</a></li>
          <li className="active"><a href="#">Reviews</a></li>
        </ul>

        <div id="nested-content">

        </div>
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
  },
});
