'use strict'
var React = require('react');
var FlavourMapEmbedded = require("../flavour_map/_flavour_map_embedded");

module.exports = React.createClass({
  render: function() {
    /* TODO: too many functions know about constructing coordinates.
       make a function that takes in {flavor: , color:}, and returns {x:, y:}
     */
    var coords = {x: this.props.beer.avg_flavour_rating,
                  y: this.props.beer.avg_colour_rating};
    console.log(`coords: ${coords.x},${coords.y}`);
    return (
      <FlavourMapEmbedded
        targetPos={coords}
        isDraggable={false}/>
    );
  }
});
