'use strict'
var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  displayName: "Footer",

  render() {

    var loginStatus;
    if (this.props.signedIn) {
      loginStatus = (<p>Logged in as {this.props.currentUser.display_name} <a href="javascript:void(0)" onClick={this.props.logOut}>Log Out</a></p>);
    } else {
      loginStatus = (<p><Link to="/sign_in">Log In</Link></p>)
    }

    return (
      <div className="row">
        <div id="footer">
          <hr />
          <div>
            {loginStatus}
            <p style={{fontSize: "0.8em"}}>&copy; {(new Date()).getFullYear()} <a href="https://twitter.com/mctaylorpants">@mctaylorpants</a>. All images copyright their respective owners.</p>
            <p style={{fontSize: "0.8em"}}>We're in beta right now; keep checking back for new and exciting updates!</p>
          </div>
        </div>
      </div>
    );
  },
});
