'use strict'
var React = require('react');
var Link = require('react-router').Link;

// application layout
module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>HOPPIST</h1>
        <p>Hoppist connects you with local breweries in your area. Discover new flavours, rate your favourite beer, and see what’s currently on tap for samples and fills. Hoppist is the perfect drinking buddy.</p>
        <button href="#" className="btn btn-default">SIGN UP</button>
        <hr />
        {this.props.children}
      </div>);
  },
});
