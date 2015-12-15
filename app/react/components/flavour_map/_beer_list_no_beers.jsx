'use strict'
var React = require('react');
module.exports = React.createClass({
  render() {
    return (
      <div>
        <h2 className="text-center">NO BEERS FOUND.</h2>
        <p className="text-center lighter"><em>Perhaps you've hit upon the next big flavour.</em></p>
      </div>
    );
  }
});
