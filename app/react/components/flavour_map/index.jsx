'use strict'
var Link = require('react-router').Link;
var calculateFlavourMapCoords = require("../../utils/calculate_flavour_map_coords.jsx");
var FlavourMapEmbedded = require("./_flavour_map_embedded");

module.exports = React.createClass({
  // getInitialState: function() {
  //   return {
  //     targetCoords: calculateFlavourMapCoords(6,6,,)
  //   };
  // },

  render: function() {

    return (
      <div>
        <h2 className="text-center">FLAVOUR MAP</h2>
        <p className="text-center lighter"><em>Go ahead &mdash; drag the target around the map to discover new dimensions of flavour.</em></p>
        {/* TODO: how to respond to media queries so that we can re-render this at a different res? */}
        <FlavourMapEmbedded maxWidth={375} heroTarget={{x: 50, y: 57}}/>
      </div>
    );
  },
});
