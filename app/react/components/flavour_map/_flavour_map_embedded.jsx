'use strict'
var Draggable = require('react-draggable');
var ReactDOM = require('react-dom'); // required here because we're invoking it to get the node width
var calculateFlavourMapCoords = require("../../utils/calculate_flavour_map_coords.jsx");

module.exports = React.createClass({
  getInitialState: function() {
    // TODO: 1.6 is the current aspect ratio of the flavour map; refactor this magic number
    var newTargetPos = calculateFlavourMapCoords(this.props.heroTarget.x, this.props.heroTarget.y, this.props.maxWidth, this.props.maxWidth/1.6);
    return {
      maxWidth:  this.props.maxWidth,
      targetPos: newTargetPos,
    };
  },

  componentDidMount() {
    // TODO: add event listener for page resize, currently the page must be refreshed
    // for this to update after a window size change.
    // TODO: this doesn't center properly because of the dynamic screen size
    var node                   = ReactDOM.findDOMNode(this);
    var nodeRenderedWidth      = node.offsetWidth;
    var renderedTargetDiameter = node.childNodes[0].offsetWidth;
    var newTargetPos           = calculateFlavourMapCoords(this.props.heroTarget.x, this.props.heroTarget.y, nodeRenderedWidth, nodeRenderedWidth/1.6);
    var newTargetPos           = { x: newTargetPos.x - (renderedTargetDiameter/2), y: newTargetPos.y - (renderedTargetDiameter/2)};
    this.setState({ maxWidth: nodeRenderedWidth, targetPos: {newTargetPos} });
  },

  handleTargetStop(event, ui) {
    // maybe we need this?
    console.log("Target position: " + this.state.targetPos.x + "," + this.state.targetPos.y);
  },

  handleTargetDrag(event, ui) {
    // TODO: this is a hack right now because ui.position on stop is NaN
    // for touch events. so instead we continually set the state during drag.
    // not ideal?
    this.setState({ targetPos: { x: ui.position.left, y: ui.position.top } });
  },

  render() {
    var styles = {
      width:    "100%",
      maxWidth: `${this.state.maxWidth}px`
    };

    console.log(`render() targetPos: ${this.state.targetPos.x}x${this.state.targetPos.y}`);

    return (
      <div id="flavour-map-embedded" style={styles}>
        <Draggable
          bounds="parent"
          handle=".handle"
          moveOnStartChange={true}
          onDrag={this.handleTargetDrag}
          onStop={this.handleTargetStop}
          start={this.state.targetPos}
          zIndex={100}>
          <div id="target" className="handle"></div>
        </Draggable>
        <img src="/images/flavour_map.svg" style={styles}/>
      </div>
    );
  },
});
