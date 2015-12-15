'use strict'
var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  getInitialState() {
    return { menuIsActive: false };
  },

  handleMenuClick() {
    this.setState( { menuIsActive: !this.state.menuIsActive } );
  },

  render() {
    var style = this.state.menuIsActive ? 'is-active' : '';

    return (
      <div>
        <div id="navbar-dimmer" className={style}></div>
        <nav className="hoppist-header">
          <h1 className="branded" onClick={this.handleMenuClick}>...</h1>
          <h2 className="branded">HOPPIST</h2>
          <div className="flourish">
            <hr />
            <img src="/images/hoppist-vector.svg" draggable={false}/>
          </div>
        </nav>

        <div id="mobile-navbar" className={style}>
          <div onClick={this.handleMenuClick}>
            <h4 className="branded">HOPPIST</h4>
            <h1 className="branded">...</h1>
          </div>
          <ul>
            <li><a href="#">Alex Taylor         </a></li>
            <li><a href="#">REVIEW              </a></li>
            <li><Link to="/ui/flavour-map" onClick={this.handleMenuClick}>FLAVOUR MAP</Link></li>
            <li><a href="#">MATCH MAKER         </a></li>
            <li><a href="#">DISCOVER            </a></li>
            <li><a href="#">BEERS               </a></li>
            <li><a href="#">BREWERIES           </a></li>
          </ul>
        </div>
      </div>
    );
  },
});
