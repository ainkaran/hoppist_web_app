'use strict'
var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  displayName: "Footer",

  render() {
    return (
      <div className="row">
        <div id="footer">
          <hr />
          <div>
            <p style={{fontSize: "0.8em"}}>&copy; {(new Date()).getFullYear()} <a href="https://twitter.com/mctaylorpants">@mctaylorpants</a>. All images copyright their respective owners. We're in beta right now; keep checking back for new and exciting updates!</p>
          </div>
        </div>
      </div>
    );
  },
});
