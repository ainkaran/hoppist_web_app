'use strict'
var React = require('react');
var Link = require('react-router').Link;

// application layout
module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>App!</h1>
        <ul>
          <li><Link to="/hello">Hello</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <hr />
        {this.props.children}
      </div>);
  },
});
