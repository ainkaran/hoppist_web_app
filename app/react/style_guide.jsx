'use strict'
var React = require('react');
var Link = require('react-router').Link;

// application layout
module.exports = React.createClass({
  render: function() {
    // TODO: look into React-Bootstrap
    return (
      <div>
        <h1 className="branded">HOPPIST</h1>
        <h2 className="branded">HOPPIST</h2>
        <h3>Discover amazing craft beers in your area.</h3>
        <div className="alert alert-success">Welcome back, Alex.</div>
        <div className="alert alert-danger">Invalid credentials.</div>
        <p>Hoppist connects you with local breweries in your area. Discover new flavours, rate your favourite beer, and see what’s currently on tap for samples and fills. Hoppist is the perfect drinking buddy.</p>
        <button href="#" className="btn btn-default">SIGN UP</button>
        <hr />
        {this.props.children}
        <h3>Sign up for a free account.</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" className="form-control"></input>
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail Address:</label>
            <input type="text" name="email" className="form-control"></input>
          </div>
          <div className="form-group has-error">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" className="form-control"></input>
            <span className="help-block">Your password must be more than 8 characters.</span>
          </div>
          <div className="form-group">
            <input className="btn btn-default" type="submit" value="SIGN UP" />
          </div>
        </form>
        <hr />
        <h2>Alex Taylor</h2>
        <h4 className="lighter">Vancouver, B.C.</h4>

        <button href="#" className="btn btn-tabby">follow</button><br />
        <button href="#" className="btn btn-tabby">rate</button><br />
        <button href="#" className="btn btn-tabby">add</button>

        <ul className="nav nav-tabs">
          <li role="presentation" className="active"><a href="#">Favourites</a></li>
          <li role="presentation"><a href="#">Reviews</a></li>
        </ul>
        <br />
      </div>);
  },
});
