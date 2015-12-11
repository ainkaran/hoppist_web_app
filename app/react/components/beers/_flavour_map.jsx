'use strict'

var React = require("react");
var FlavourMapEmbedded = require("../flavour_map/_flavour_map_embedded");

module.exports = React.createClass({
  render: function() {
    // TODO: don't hardcode the hero target
    var heroTargetCoords = {x: 300, y: 100};

    return (
      <FlavourMapEmbedded heroTarget={heroTargetCoords}/>
    );
  }
});
