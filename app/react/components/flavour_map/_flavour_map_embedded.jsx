'use strict'
var Draggable = require('react-draggable');
var ReactDOM = require('react-dom'); // required here because we're invoking it to get the node width
var calculateFlavourMapCoords = require("../../utils/calculate_flavour_map_coords.jsx");

module.exports = React.createClass({
  propTypes: {
    onDragStart: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      isDraggable: false,
      maxWidth: 375,
      heroTarget: { x: 6, y: 6 }
    };

  },

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
    console.log("Target position: " + this.state.targetPos.x + "," + this.state.targetPos.y);

    // handle any action the parent component wants to take when the user finishes
    // dragging. for the flavour map index page, this results in the welcome message
    // disappearing and the beer list appearing. As a result, this will also trigger
    // the beer list to re-render.
    if(this.props.onDragStop !== undefined) {
      this.props.onDragStop();
    }

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

    return (
      <div id="flavour-map-embedded" style={styles}>
        <Draggable
          bounds="parent"
          cancel={this.props.isDraggable ? "" : ".handle"}
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
