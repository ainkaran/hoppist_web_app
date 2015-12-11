'use strict'
var React = require('react');
var Link = require('react-router').Link;

var Reviews = require("./_reviews");
var FlavourMap = require("./_flavour_map");

module.exports = React.createClass({

  render() {
    var beerId = this.props.params.id

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
          {/* TODO: figure out a good way to abstract these URLs, maybe with some Rails-style link helpers */}
          {/* TODO: fix the case of the stuck hover state on these tabs */}
          <li><Link to={`/beers/${beerId}/flavour-map`} activeClassName={"active"}>Flavour Map</Link></li>
          <li><Link to={`/beers/${beerId}/reviews`} activeClassName={"active"}>Reviews</Link></li>
        </ul>

        <div id="nested-content">
          {this.props.children}
        </div>



      </div>
    );
  },
});
