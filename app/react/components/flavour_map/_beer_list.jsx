'use strict'
var React = require('react');
var BeerCardVitals = require("../beers/_beer_card_vitals");
var BeerListIntro = require("./_beer_list_intro");
var LoadingBeers = require("./_loading_beers");
var NoBeers = require("./_beer_list_no_beers");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  getInitialState() {
    return { display: "intro", beers: [], breweries: [] }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.setState( { display: "loading" });
      return;
    }

    if (nextProps.beers.length > 0) {
      this.setState( { display: "beerList" });
    } else {
      this.setState( { display: "noBeers" });
    }
  },

  render() {
    var beerNodes = this.props.beers.map((beer, idx)=> {
      var brewery = this.props.breweries.find(function(el){ return el.id === beer.relationships.brewery.data.id });
      beer.attributes.id = beer.id;
      return (
        <BeerCardVitals
          key={beer.id}
          beer={beer.attributes}
          brewery={brewery.attributes}
          onNavigation={this.props.onNavigation} />
      );
    });

    var beerList = (
      <div>
        <p className="text-center lighter"><em>found {this.props.beers.length} beers:</em></p>
        {beerNodes}
      </div>
    );

    var nestedContent;
    switch (this.state.display) {
      case "intro":
        nestedContent = (
          <BeerListIntro key="intro" />
        );
        break;
      case "beerList":
        nestedContent = beerList;
        break;
      case "noBeers":
        nestedContent = (<NoBeers key="nobeers" />);
        break;
      case "loading":
        nestedContent = (<LoadingBeers key="loadingBeers" />);
        break;
    }

    return (
      <div id="beer-list">
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {nestedContent}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
