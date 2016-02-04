'use strict'
var React = require('react');
var ReactDOM = require('react-dom'); // required here because we're invoking it to get the node width
var Draggable = require('react-draggable');
var calculateDbCoords = require("../../utils/calculate_db_coords");

module.exports = React.createClass({
  getInitialState() {
    // these values are a best-guess at what it will probably be, but they'll get
    // set properly once the component mounts.
    /* TODO: the starting target coords are hardcoded based on this formula:
       gradient_height = 60px (from CSS)
       target_diamter = 28px (calculated from 2em in CSS)
       y_offset = (gradient_height/2)-(target_diamter/2)
    */

    return {
      activated: false,
      width:  308,
      height: 60,
      targetDiameter: 28,
      targetPos: {x: 0, y: 16} }
  },

  setGradientRenderedState(c) {
    /* When a ref is a callback, the callback will be invoked with 'null' upon
       unmounting the object. So we need to check if c exists before continuing.
       See https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
   */
    if (c) {
      this.setState({ width: c.offsetWidth, height: c.offsetHeight });
    }
  },

  setTargetRenderedState(c) {
    if (c) {
      this.setState({ targetDiameter: c.offsetWidth });
    }
  },

  handleTargetDragStart() {
    this.setState({ activated: true });
  },

  handleTargetStop(event, ui) {
    var newCoords = calculateDbCoords(this.state.targetPos.x,
                                      this.state.targetPos.y,
                                      this.state.width,
                                      this.state.height);
    // without doing this we get min=0, max=11
    newCoords.x += 1;
    this.setState({ value: newCoords.x })
  },

  handleTargetDrag(event, ui) {
    // TODO: this is a hack right now because ui.position on stop is NaN
    // for touch events. so instead we continually set the state during drag.
    // not ideal?
    this.setState({ targetPos: { x: ui.position.left, y: ui.position.top } });
  },

  render() {
    var opacity = this.state.activated ? "1.0" : "0.25";

    return (
      <div className="form-group">
        <label htmlFor="colour_rating">{this.props.title}</label>
        <div ref={this.setGradientRenderedState}
             id={this.props.type}
             style={{position: 'relative', opacity: opacity}}>

          <Draggable
            axis="x"
            bounds="parent"
            handle=".handle"
            onStart={this.handleTargetDragStart}
            onDrag={this.handleTargetDrag}
            onStop={this.handleTargetStop}
            start={{x: 0, y: 16}}
            zIndex={100}>
            <div ref={this.setTargetRenderedState} id="target" className="handle"></div>
          </Draggable>

        </div>
      </div>
    );
  },
});
