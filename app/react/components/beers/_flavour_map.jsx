'use strict'

var FlavourMapEmbedded = require("../flavour_map/_flavour_map_embedded");

module.exports = React.createClass({
  contextTypes: {
    beer: React.PropTypes.object
  },

  render: function() {
    // TODO: too many functions know about constructing coordinates.
    // make a function that takes in {flavor: , color:}, and returns {x:, y:}
    var coords = {x: this.context.beer.avg_flavour_rating,
                  y: this.context.beer.avg_colour_rating};
    console.log(`coords: ${coords.x},${coords.y}`);
    return (
      <FlavourMapEmbedded
        targetPos={coords}
        isDraggable={false}/>
    );
  }
});
