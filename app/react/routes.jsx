'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route

// pages
var StyleGuide = require("./components/style_guide");
var BeerShow = require("./components/beer_show");
var Navbar = require("./components/mobile_navbar");

ReactDOM.render((
  <Router>
    <Route path="/" component={StyleGuide} />
    <Route path="/beer-show" component={BeerShow} />
    <Route path="/navbar" component={Navbar} />
  </Router>
), document.getElementById('container'));
