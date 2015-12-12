'use strict'
var Link = require('react-router').Link;

var FlavourMapEmbedded = require("./_flavour_map_embedded");
var BeerList = require("./_beer_list.jsx");

module.exports = React.createClass({
  getInitialState() {
    return { display: "intro" }
  },

  handleDragStop() {
    console.log("display -> beerList");
    this.setState({ display: "beerList" });
  },

  render: function() {

    return (
      <div>
        {/* TODO: how to respond to media queries so that we can re-render this at a different res? */}
        <FlavourMapEmbedded onDragStop={this.handleDragStop} maxWidth={375} heroTarget={{x: 6, y: 6}}/>
          <BeerList display={this.state.display} />
      </div>
    );
  },
});
