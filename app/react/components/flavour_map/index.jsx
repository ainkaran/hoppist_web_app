'use strict'
var Link = require('react-router').Link;

var FlavourMapEmbedded = require("./_flavour_map_embedded");
var BeerList = require("./_beer_list");
var $ = require("jquery");

module.exports = React.createClass({
  // TODO: since we're initing an empty beers array, do we even need the display
  // state or can we infer it?
  getInitialState() {
    return { beers: [], display: "intro" }
  },


  ajaxPostFlavourMapSearch(searchCoords) {
    // TODO: refactor and abstract URLs somehow
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/api/v1/flavour_map/search",
      data: { coords: searchCoords },
      success: (response) => {
        var newBeers = response.data;

        if (newBeers.length > 0) {
          console.log(`Beers found: ${newBeers.length} | first id: ${newBeers[0].id} | last id: ${newBeers[newBeers.length-1].id}`);
        } else {
          console.log(`Beers found: 0`);
        }

        this.setState({ beers: newBeers, display: "beerList" });
      },

      error: (obj, msg, err) => {
        console.log(`error in request: ${msg} / ${err}`);
      }
    });
  },

  handleDragStop(newCoords) {
    this.ajaxPostFlavourMapSearch(newCoords);
  },

  render: function() {
    return (
      <div>
        {/* TODO: how to respond to media queries so that we can re-render this at a different res? */}
        <FlavourMapEmbedded
          heroTarget={{x: 6, y: 6}}
          isDraggable={true}
          maxWidth={375}
          onDragStop={this.handleDragStop} />
        <BeerList display={this.state.display} beers={this.state.beers} />
      </div>
    );
  },
});
