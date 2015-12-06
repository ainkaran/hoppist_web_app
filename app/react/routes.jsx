'use strict'
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route

// pages
var App = require("./App");

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>
), document.getElementById('container'));
