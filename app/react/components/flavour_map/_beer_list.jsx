'use strict'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  getDefaultProps() {
    return {
      display: "intro"
    };
  },

  render() {
    console.log("Render beerList, display: " + this.props.display );
    var intro = (
      <div key="intro">
        <h2 className="text-center">FLAVOUR MAP</h2>
        <p className="text-center lighter"><em>Go ahead &mdash; drag the target around the map to discover new dimensions of flavour.</em></p>
      </div>
    );

    var beerList = (
      <div key="beerList">
        <hr />
        <div className="beer-card clearfix">

          <div className="col-image">
            <div className="img-thumbnail beer-thumb">
              <img src="/images/hop_circle.png" width="88" height="105" />
            </div>
          </div>

          <div className="col-details">
            <h5><a href="#">Blue Buck</a> <i>by</i> <a href="#">Phillips Brewing Co.</a></h5>
            <p className="indent italicize lighter">ale; 5pct; 45 ibu</p>
            <div className="review-stars">
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </div>
          </div>
        </div>


        <div className="beer-card clearfix">

          <div className="col-image">
            <div className="img-thumbnail beer-thumb">
              <img src="/images/hop_circle.png" width="88" height="105" />
            </div>
          </div>

          <div className="col-details">
            <h5><a href="#">Blue Buck</a> <i>by</i> <a href="#">Phillips Brewing Co.</a></h5>
            <p className="indent italicize lighter">ale; 5pct; 45 ibu</p>
            <div className="review-stars">
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </div>
          </div>
        </div>


        <div className="beer-card clearfix">

          <div className="col-image">
            <div className="img-thumbnail beer-thumb">
              <img src="/images/hop_circle.png" width="88" height="105" />
            </div>
          </div>

          <div className="col-details">
            <h5><a href="#">Blue Buck</a> <i>by</i> <a href="#">Phillips Brewing Co.</a></h5>
            <p className="indent italicize lighter">ale; 5pct; 45 ibu</p>
            <div className="review-stars">
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </div>
          </div>
        </div>

        <br />
      </div>
    );

    var display = this.props.display === "intro" ? intro : beerList

    return (
      <div id="beer-list">
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {display}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
