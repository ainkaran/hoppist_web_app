'use strict'
var React = require('react');
var Link = require('react-router').Link;
var Navbar = require('./mobile_navbar');

module.exports = React.createClass({
  getInitialState() {
    return { menuIsActive: false };
  },

  handleMenuClick() {
    this.setState( { menuIsActive: !this.state.menuIsActive } );
  },

  render() {
    var style = this.state.menuIsActive ? 'mobile-navbar is-active' : 'mobile-navbar';

    return (
      <div>
        <nav className="hoppist-header">
            <h1 className="branded" onClick={this.handleMenuClick}>...</h1>
            <h2 className="branded">HOPPIST</h2>
            <div className="flourish">
              <hr />
              <img src="/images/hop.png" />
            </div>
        </nav>
        <div className={style}>
          <div onClick={this.handleMenuClick}>
            <h4 className="branded">HOPPIST</h4>
            <h1 className="branded">...</h1>
          </div>
          <ul>
            <li><span><a href="#">Alex Taylor    . . . . . . . . . . . . . . </a></span></li>
            <li><span><a href="#">REVIEW         . . . . . . . . . . . . . . </a></span></li>
            <li><span><a href="#">FLAVOUR MAP    . . . . . . . . . . . . . . </a></span></li>
            <li><span><a href="#">MATCH MAKER IS GREAT    . . . . . . . . . . . . . . </a></span></li>
            <li><span><a href="#">DISCOVER       . . . . . . . . . . . . . . </a></span></li>
            <li><span><a href="#">BEERS          . . . . . . . . . . . . . . </a></span></li>
            <li><span><a href="#">BREWERIES      . . . . . . . . . . . . . . </a></span></li>
          </ul>
        </div>
      </div>
    );
  },
});
