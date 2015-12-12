'use strict'
var Link = require('react-router').Link;

var FlavourMapEmbedded = require("./_flavour_map_embedded");

module.exports = React.createClass({
  render: function() {

    return (
      <div>
        {/* TODO: how to respond to media queries so that we can re-render this at a different res? */}
        <FlavourMapEmbedded maxWidth={375} heroTarget={{x: 6, y: 6}}/>
          <h2 className="text-center">FLAVOUR MAP</h2>
          <p className="text-center lighter"><em>Go ahead &mdash; drag the target around the map to discover new dimensions of flavour.</em></p>

      </div>
    );
  },
});
