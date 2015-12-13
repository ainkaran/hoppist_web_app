'use strict'

var $ = require("jquery");
var BeerList = require("./_beer_list");
var FlavourMapEmbedded = require("./_flavour_map_embedded");
var Link = require('react-router').Link;


module.exports = React.createClass({
  getInitialState() {
    return { beers: [], breweries: [], resultsLoading: false }
  },


  ajaxPostFlavourMapSearch(searchCoords) {
    $.ajax({
      method: "POST",
      url: "/api/v1/flavour_map/search",
      data: { coords: searchCoords },
      success: (response) => {
        var newBeers  = response.data;
        var breweries = response.included;

        // TODO: remove this for production. maybe we can orchestrate webpack to handle this for us.
        if (newBeers.length > 0) {
          console.log(`Beers found: ${newBeers.length} | first id: ${newBeers[0].id} | last id: ${newBeers[newBeers.length-1].id}`);
        } else {
          console.log(`Beers found: 0`);
        }

        this.setState({ beers: newBeers, breweries: breweries, resultsLoading: false });
      },

      error: (obj, msg, err) => {
        console.log(`error in request: ${msg} / ${err}`);
      }
    });
  },

  handleDragStop(newCoords) {
    this.setState({ resultsLoading: true });
    this.ajaxPostFlavourMapSearch(newCoords);
  },

  handleNavigation(params) {
    var url = params["url"];
    if (url) { this.props.history.push(url); }
  },

  render: function() {
    var loading = this.state.resultsLoading;
    return (
      <div>
        {/* TODO: how to respond to media queries so that we can re-render this at a different res? */}
        <FlavourMapEmbedded
          heroTarget={{x: 6, y: 6}}
          isDraggable={true}
          maxWidth={375}
          onDragStop={this.handleDragStop} />
        <BeerList loading={loading} beers={this.state.beers} breweries={this.state.breweries} onNavigation={this.handleNavigation} />
      </div>
    );
  },
});
