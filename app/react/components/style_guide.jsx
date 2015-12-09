'use strict'
var React = require('react');
var Link = require('react-router').Link;

// application layout
module.exports = React.createClass({
  render: function() {
    // TODO: look into React-Bootstrap
    return (
      <div>
        // HEADINGS
        <h1 className="branded">HOPPIST</h1>
        <h2 className="branded">HOPPIST</h2>
        <h3>Discover amazing craft beers in your area.</h3>


        // FLASH
        <div className="alert alert-success">Welcome back, Alex.</div>
        <div className="alert alert-danger">Invalid credentials.</div>


        // BODY
        <p>Hoppist connects you with local breweries in your area. Discover new flavours, rate your favourite beer, and see what’s currently on tap for samples and fills. Hoppist is the perfect drinking buddy.</p>
        <button href="#" className="btn btn-default">SIGN UP</button>
        <hr />


        // FORMS
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


        // PAGE COMPONENTS
        <hr />
        <img src="/images/alex_avatar.jpg" className="img img-thumbnail" width="145" />
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


        // BEER REVIEW CARD
        <div className="beer-card clearfix">

          <div className="col-image">
            <div className="img-thumbnail beer-thumb">
              <img src="/images/hop_circle.png" width="88" height="105" />
            </div>
          </div>

          <div className="col-review">
            <h5><a href="#">Blue Buck</a> <i>by</i> <a href="#">Phillips Brewing Co.</a></h5>
            <p className="review-subhead lighter"><i>June 15, 2015</i></p>
            <div className="review-stars">
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </div>
            <p>This beer is one of my favourites, really nice session ale with a crisp flavour. Would recommend...</p>
          </div>
        </div>

        // BEER REVIEWS
        <h3>SIXTEEN FAVOURITE BEERS FROM FOUR BREWERIES</h3>
        <div className="beers">
          <div className="beer-thumb-large img-thumbnail">
            <img src="/images/hop_circle.png" width="135" height="161" />
          </div>
          <div className="beer-thumb-large img-thumbnail">
            <img src="/images/hop_circle.png" width="135" height="161" />
          </div>
          <div className="beer-thumb-large img-thumbnail">
            <img src="/images/hop_circle.png" width="135" height="161" />
          </div>
          <div className="beer-thumb-large img-thumbnail">
            <img src="/images/hop_circle.png" width="135" height="161" />
          </div>

        </div>

        <br />
        <br />
        <br />
      </div>);
  },
});
