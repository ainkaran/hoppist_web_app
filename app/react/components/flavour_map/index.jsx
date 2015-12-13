'use strict'

var $ = require("jquery");
var BeerList = require("./_beer_list");
var FlavourMapEmbedded = require("./_flavour_map_embedded");
var Link = require('react-router').Link;


module.exports = React.createClass({
  getInitialState() {
    return { beers: [], breweries: [] }
  },


  ajaxPostFlavourMapSearch(searchCoords) {
    $.ajax({
      method: "POST",
      url: "/api/v1/flavour_map/search",
      data: { coords: searchCoords },
      success: (response) => {
        var newBeers  = response.data;
        var breweries = response.included;

        if (newBeers.length > 0) {
          console.log(`Beers found: ${newBeers.length} | first id: ${newBeers[0].id} | last id: ${newBeers[newBeers.length-1].id}`);
        } else {
          console.log(`Beers found: 0`);
        }

        this.setState({ beers: newBeers, breweries: breweries });
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
        <BeerList beers={this.state.beers} breweries={this.state.breweries} />
      </div>
    );
  },
});