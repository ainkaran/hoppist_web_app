'use strict'
var React = require('react');
var Draggable = require('react-draggable');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      targetPos: {x: 0, y: 0}
    };
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
    return (
      <div id="flavour-map-embedded">
        <Draggable
          start={this.props.heroTarget}
          bounds="parent"
          handle=".handle"
          zIndex={100}
          onDrag={this.handleTargetDrag}
          onStop={this.handleTargetStop}>
          <div id="target" className="handle"></div>
        </Draggable>
      </div>
    );
  },
});
