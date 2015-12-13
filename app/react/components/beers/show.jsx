'use strict'
var Link = require('react-router').Link;

var Reviews = require("./_reviews");
var FlavourMap = require("./_flavour_map");

module.exports = React.createClass({
  getInitialState() {
    return { beer: {}, brewery: {} }
  },

  ajaxGetBeer(id) {
    // TODO: refactor this url
    $.ajax({
      method: "GET",
      url: `/api/v1/beers/${id}`,
      success: (response) => {
        var beer      = response.data.attributes;
        var brewery   = { id:   response.data.relationships.brewery.data.id,
                          name: response.included[0].attributes.name
                        };
        this.setState({ beer: beer, brewery: brewery });
      },

      error: (obj, msg, err) => {
        console.log(`error in request: ${msg} / ${err}`);
      }
    })
  },

  componentDidMount() {
    this.ajaxGetBeer(this.props.params.id);
  },

  render() {
    var beerId = this.props.params.id

    return (
      <div id="beer-show">
        <div id="beer-show-header">
          {/* TODO: fix thumbnail on mobile, it gets squished by the flex layout */}
          <div id="beer-show-header-thumb">
            {/* TODO: remove hard-coding on beer thumbnail image */}
            <img src="/images/hop_circle.png" className="img img-thumbnail" />
          </div>
          <div id="beer-show-header-detail">
            <div id="beer-show-header-detail-title-block">
              <h2 className="flush-with-top">
                {this.state.beer.name}
              </h2>
              <h4>
                <Link to={`/breweries/${this.state.brewery.id}`}>{this.state.brewery.name}</Link>
              </h4>
              <p className="indent italicize lighter">ale; 5pct; 45 ibu</p>
            </div>
            <div className="review-stars">
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
              <span className="glyphicon glyphicon-star"></span>
            </div>
            <p className="indent italicize lighter">out of 15 reviews</p>
            <p><span className="glyphicon glyphicon-grain"></span> growler fills</p>
            <p><span className="glyphicon glyphicon-grain"></span> bottles / cans</p>
          </div>
          <div id="beer-show-header-actions">
            <button href="#" className="btn btn-tabby">rate</button>
            <button href="#" className="btn btn-tabby">add</button>
          </div>
        </div>

        <ul className="nav nav-tabs">
          {/* TODO: figure out a good way to abstract these URLs, maybe with some Rails-style link helpers */}
          {/* TODO: fix the case of the stuck hover state on these tabs */}
          <li><Link to={`/beers/${beerId}/flavour-map`} activeClassName={"active"}>Flavour Map</Link></li>
          <li><Link to={`/beers/${beerId}/reviews`} activeClassName={"active"}>Reviews</Link></li>
        </ul>

        <div id="nested-content">
          {this.props.children}
        </div>



      </div>
    );
  },
});
