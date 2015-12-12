'use strict'

module.exports = React.createClass({
  getDefaultProps() {
    return {
      display: "intro"
    };
  },

  render() {
    console.log("Render beerList, display: " + this.props.display );
    var intro = (
      <div>
        <h2 className="text-center">FLAVOUR MAP</h2>
        <p className="text-center lighter"><em>Go ahead &mdash; drag the target around the map to discover new dimensions of flavour.</em></p>
      </div>
    );

    var beerList = (
      <div>
        <h2>beers go here...</h2>
        <h2>beers go here...</h2>
        <h2>beers go here...</h2>
        <h2>beers go here...</h2>
      </div>
    );

    var display = this.props.display === "intro" ? intro : beerList

    return (
      <div id="beer-list">
        {display}
      </div>
    );
  }
});
