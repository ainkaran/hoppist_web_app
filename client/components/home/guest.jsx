'use strict'
var React = require('react');
var Link = require('react-router').Link;

module.exports = React.createClass({
  displayName: 'HomePageGuest',
  render() {
    return (
      <div>
        <h1 className="branded text-center">WELCOME TO HOPPIST.</h1>
        <div className="center-block" style={{maxWidth: "26em"}}>
          <hr />
          <p style={{ fontSize: "1.15em"}}>
            Hoppist connects you with local breweries in your area. Discover new flavours, rate your favourite beer, and see what’s currently on tap for samples and fills. Hoppist is the perfect drinking buddy.
          </p>
        </div>

        <hr />

        <div className="site-feature row">
          <div className="col-sm-4">
            <img className="img img-thumbnail pull-right" style={{width: "240px", height: "auto"}} src="/images/welcome-DISCOVER.png" />
          </div>
          <div className="col-sm-8">
            <h2 className="branded flush-with-top">DISCOVER.</h2>
            <p><small className="branded">HOPPIST</small> is a recommendation site for craft beer. We think you should discover beer like you discover movies &mdash; by asking yourself what you’re in the mood for. Check out our innovative <Link to="/ui/flavour-map">Flavour Map</Link> to discover your next favourite brew. Or, try out our <Link to="/ui/match-maker">Match Maker</Link> if you’re looking for something curated to your favourite tastes.</p>
          </div>
        </div>

        <hr />

        <div className="site-feature row">
          <div className="col-sm-4">
            <a dataFlickrEmbed="true" href="https://www.flickr.com/photos/128012202@N05/14969468914/in/photolist-oNNrzC-cRbGPE-cRbwzL-cRbzDs-cRbxKA-eZWdV9-iiKxEJ-mYj3mK-r6aMwg-xVs7fJ-opN9WF-oGfYm5-c3aYkm-s4RPq2-c3b1gY-xERsxv-mYDrCZ-9kWMxV-atqASr-8H8o5L-sxQwvx-opNEzr-opN9SH-c3b2J9-nEgnfA-c3b2VN-dz7YZ3-8H5eYH-gmaziu-8EqLcg-qaq5My-esVLor-oipyAt-8EtVJW-8EqNk4-q6CQ6z-sRdJBv-8EqNwZ-8EtYdb-8EqNtn-8EtUob-8EtWnS-8EqKU4-8EqNUM-8EtXWq-8EqNZi-8EqMDe-8EqMe8-8EqMT4-8EtWNy" title="Flight of Beers, Vancouver, British Columbia, Canada">
              <img className="img img-thumbnail pull-right" style={{width: "240px", height:"auto"}} src="https://farm4.staticflickr.com/3945/14969468914_d822dc06e4_m.jpg" alt="Flight of Beers, Vancouver, British Columbia, Canada" /></a>
              <script async src="//embedr.flickr.com/assets/client-code.js" charSet="utf-8"></script>
          </div>
          <div className="col-sm-8">
            <h2 className="branded flush-with-top">DISCERN.</h2>
            <p><small className="branded">HOPPIST</small> is driven by you. Sign up and start rating the beers you love - and the ones you don't. In addition to rating the quality, you can also profile the appearance and flavour - you'll help drive our flavour map and recommendation engine.</p>
          </div>
        </div>

        <hr />


        <div className="site-feature row">
          <div className="col-sm-4">
            <a dataFlickrEmbed="true" href="https://www.flickr.com/photos/stankus/7162768685/" title="Odell Kölsch">
              <img className="img img-thumbnail pull-right" style={{width: "240px", height:"auto"}} src="https://farm8.staticflickr.com/7214/7162768685_c4fb50fc6b_n.jpg" width="234" height="320" alt="Odell Kölsch" /></a>
              <script async src="//embedr.flickr.com/assets/client-code.js" charSet="utf-8"></script>
          </div>
          <div className="col-sm-8">
            <h2 className="branded flush-with-top">DRINK.</h2>
            <p>Beer should be social. <small className="branded">HOPPIST</small> gives you a beautiful space to showcase your favourite brews, and see what your friends are drinking. Follow your favourite breweries to get their latest social media updates.</p>
          </div>
        </div>


    </div>
  );
  },
});
