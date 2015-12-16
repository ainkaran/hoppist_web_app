'use strict'
// react
var React = require('react');
var ReactDOM = require('react-dom');

// react-router
var IndexRoute = require('react-router').IndexRoute
var Redirect = require('react-router').Redirect
var Router = require('react-router').Router
var Route = require('react-router').Route
var createBrowserHistory = require('history/lib/createBrowserHistory');

// libraries
var $ = require("jquery");

// pages
var App                      = require("./components/app");
var BeerIndex                = require("./components/beers/index");
var BeerShow                 = require("./components/beers/show");
var BeerShowFlavourMap       = require("./components/beers/_flavour_map");
var BeerShowReviews          = require("./components/beers/_reviews");
var HomePageGuest            = require("./components/home/guest");
var FlavourMapIndex          = require("./components/flavour_map/index");
var StyleGuide               = require("./components/style_guide");


// TODO: challenges with react router: the nesting assumes that you're rendering
// a child in a parent component. so we can't nest beers within breweries for the
// sake of the url; we have to hardcode the nesting if we want that path.
ReactDOM.render((

  <Router history={createBrowserHistory()}>
    <Redirect from="/" to="/ui" />
    <Route path="/ui" component={App}>
      <IndexRoute component={HomePageGuest} />
      <Route path="beers" component={BeerIndex} />
      <Route path="beers/:id" component={BeerShow}>
        <IndexRoute component={BeerShowFlavourMap} />
        <Route path="flavour-map" component={BeerShowFlavourMap} />
        <Route path="reviews" component={BeerShowReviews} />
      </Route>
      <Route path="flavour-map" component={FlavourMapIndex} />




      {/* TEST ROUTES */}
      <Route path="styleguide" component={StyleGuide} />
      <Route path="styleguide/beer-show" component={BeerShow} />

  </Route>
  </Router>
), document.getElementById('container'));
