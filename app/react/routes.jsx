'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route

// pages
var StyleGuide = require("./components/style_guide");
var BeerShow = require("./components/beer_show");

ReactDOM.render((
  <Router>
    <Route path="/" component={StyleGuide} />
    <Route path="/beer-show" component={BeerShow} />
  </Router>
), document.getElementById('container'));
