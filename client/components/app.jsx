'use strict'
var React = require('react');
var Footer = require('./footer');
var HeaderNavbar = require('./header_navbar');
var Uri = require('jsuri');
var Reqwest = require('reqwest')

module.exports = React.createClass({
  displayName: "App",

  API_ENDPOINT: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api/v1' : '/api/v1',

  getInitialState() {
    return { displayFlash: false, signedIn: false, currentUser: {} }
  },

  componentWillReceiveProps() {
    /* stores the referring URL every time the location changes.
       this way we can capture the referring page during an auth cycle */
    window.urlReferrer = this.props.location;
    console.log("Setting referrer URL");
  },

  componentWillMount() {
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (jwt) {
      localStorage.setItem('jwt', jwt);
      this.setState({ displayFlash: true })

      if (sessionStorage.getItem('urlReferrer')) {
        this.props.history.push({pathname: sessionStorage.getItem('urlReferrer')});
        sessionStorage.removeItem('urlReferrer');
      }
    }

  },

  componentDidMount() {
    if (localStorage.getItem('jwt')) {
      this.getCurrentUser();
    }
  },

  apiRequest(optionsObj) {
    var url     = optionsObj.url
    var method  = optionsObj.method
    var data    = optionsObj.data
    var success = optionsObj.success
    var error   = optionsObj.error ? optionsObj.error : (error)=>{ console.error(url, error['response']); location = '/';}

    // Handle relative and absolute URLs
    if(url[0] !== '/') {
      url = `${this.API_ENDPOINT}/${url}`;
    }

    /* TODO: when I add contentType: application/json to the Reqwest
      object, Rails complains 'Error occurred while parsing request parameters.'
      Am I somehow not encoding the JSON correctly with this request??  */
    Reqwest({
      url: url,
      method: method,
      type: 'json',
      data: data,
      headers: {'Authorization': localStorage.getItem('jwt') },
      success: success,
      error: error
    });
  },


  getCurrentUser() {
    this.apiRequest({
      url:     '/api/logged_in_user',
      method:  'get',
      success: (user) => {
        this.setState({
          signedIn: true,
          currentUser: Object.assign(user.data.attributes, {id: user.data.id})
        })
      }
    })
  },

  handleLogOut() {
    localStorage.removeItem('jwt');
    this.setState({
      signedIn: false,
      currentUser: {}
    })
  },


  render() {
    var signedInFlash;
    if (this.state.displayFlash) {
      signedInFlash = (<div className="alert alert-success">Signed in successfully.</div>);
    }

    var betaBadgeStyle = {
      textAlign: 'center',
      background: '#A6AB85',
      color: 'white',
      padding: '5px',
      fontSize: '90%'
    }
    // TODO: reinstate signedInFlash using react-router callback
    return (
      <div id="app">
        {/*<div className="beta-badge" style={betaBadgeStyle}>Heads up - we're still in beta! Not all features are functional at the moment.</div>*/}
        <HeaderNavbar
          signedIn={this.state.signedIn}
          currentUser={this.state.currentUser}/>

        {React.cloneElement(this.props.children,
          {apiRequest:  this.apiRequest,
           signedIn: this.state.signedIn,
           currentUser: this.state.currentUser}
        )}

        <Footer
          signedIn={this.state.signedIn}
          currentUser={this.state.currentUser}
          logOut={this.handleLogOut}/>
      </div>
    );
  },
});
