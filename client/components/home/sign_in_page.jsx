'use strict'
var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  displayName: 'SignInPage',

  componentWillMount() {
    if (window.urlReferrer) sessionStorage.setItem('urlReferrer', window.urlReferrer.pathname)
  },

  render() {
    var extraMargin = { margin: "5px" }

    return (
      <div id='sign-in'>
        <h2 className='text-center'>SIGN IN</h2>
        <p className='text-center'>Start your Hoppist life by signing in with your Google or Twitter account.</p>
        <p className='text-center'>Don't worry &mdash; we'll <em>never</em> tweet or post anything on your behalf, or share your information, or any other evil things.</p>
        <hr />
        <div className="text-center">
          <a href="/auth/google_oauth2" className="btn btn-default" style={extraMargin}>SIGN IN WITH GOOGLE</a>
          <a href="/auth/twitter" className="btn btn-default" style={extraMargin}>SIGN IN WITH TWITTER</a>
        </div>

      </div>
    )
  }
})
