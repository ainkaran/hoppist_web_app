'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route

// pages
var StyleGuide = require("./style_guide");

ReactDOM.render((
  <Router>
    <Route path="/" component={StyleGuide}>
    </Route>
  </Router>
), document.getElementById('container'));
