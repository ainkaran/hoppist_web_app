'use strict'
var React = require('react');
var Footer = require('./footer');
var HeaderNavbar = require('./header_navbar');
var Uri = require('jsuri');
var Reqwest = require('reqwest')

module.exports = React.createClass({
  displayName: "App",
  
  API_ENDPOINT: '/api/v1/',

  getInitialState() {
    return { signedIn: false, currentUser: {} }
  },

  componentWillMount() {
    var jwt = new Uri(location.search).getQueryParamValue('jwt');
    if (jwt) { sessionStorage.setItem('jwt', jwt); }
  },

  componentDidMount() {
    if (sessionStorage.getItem('jwt')) {
      this.getCurrentUser();
    }
  },

  getData(url, success) {
    // Handle relative and absolute URLs
    if(url[0] !== '/') {
      url = `${this.API_ENDPOINT}/${url}`;
    }

    Reqwest({
      url: url,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      headers: {'Authorization': sessionStorage.getItem('jwt') },
      success: success,
      error: function(error) {
        console.error(url, error['response']);
        location = '/';
      }
    });
  },

  postData() {

  },

  getCurrentUser() {
    this.getData('/api/current_user', (user) => {
      console.log("getCurrentUser SUCCESS");
      this.setState({
        signedIn: true,
        currentUser: user
      })
    })
  },


  render() {
    return (
      <div id="app">
        <HeaderNavbar />
        {React.cloneElement(this.props.children,
          {getData:  this.getData,
           postData: this.postData}
        )}
        <Footer />
      </div>
    );
  },
});
