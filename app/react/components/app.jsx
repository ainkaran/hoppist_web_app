'use strict'
var React = require('react');
var HeaderNavbar = require('./header_navbar');

module.exports = React.createClass({
  render() {
    return (
      <div id="app">
        <HeaderNavbar />
        {this.props.children}
      </div>
    );
  },
});
