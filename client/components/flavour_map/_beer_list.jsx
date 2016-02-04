'use strict'
var React = require('react');
var BeerCardVitals = require("../beers/_beer_card_vitals");
var BeerListIntro = require("./_beer_list_intro");
var LoadingBeers = require("./_loading_beers");
var NoBeers = require("./_beer_list_no_beers");
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

module.exports = React.createClass({
  displayName: "FlavourMapBeerList",

  getInitialState() {
    return { display: "intro" }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading) {
      this.setState( { display: "loading" });
      return;
    }

    /* Previously, the beer list was triggering when the currentUser and signedIn
       props were passed down to FlavourMapIndex from App. This fix ensures that
       the beer list is only displayed on a transition from loading to not loading,
       which will only be triggered by an API call passing results through */
    if (this.props.loading === true && nextProps.loading === false) {
      if (nextProps.beers.length > 0) {
        this.setState( { display: "beerList" });
      } else {
        this.setState( { display: "noBeers" });
      }
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

    var beerList;
    if (this.props.searchTerm) {
      beerList = (
        <div>
          <p className="text-center lighter"><em>found {this.props.beers.length} beers matching '{this.props.searchTerm}':</em></p>
          {beerNodes}
        </div>
      );
    } else {
      beerList = (
        <div>
          <p className="text-center lighter"><em>found {this.props.beers.length} beers:</em></p>
          {beerNodes}
        </div>
      );
    }


    var nestedContent;
    var backToTop;

    switch (this.state.display) {
      case "intro":
        nestedContent = (
          <BeerListIntro key="intro" />
        );
        break;
      case "beerList":
        nestedContent = beerList;
        if (this.props.beers.length > 10) { backToTop = (<p className="text-center lighter italicize"><a href="#">back to top</a></p>); }
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
        <hr className="visible-xs"/>
        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
          {nestedContent}
          {backToTop}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});
