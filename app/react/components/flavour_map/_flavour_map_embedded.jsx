'use strict'
var React = require('react');
var Draggable = require('react-draggable');
var ReactDOM = require('react-dom'); // required here because we're invoking it to get the node width
var calculateFlavourMapCoords = require("../../utils/calculate_flavour_map_coords");
var calculateDbCoords = require("../../utils/calculate_db_coords");

module.exports = React.createClass({
  /*
    TODO: this is a much-improved version of the flavour map in terms of consistent
    and predictable updating of target position, but from the flavour index it
    ends up calling render one too many times. Look into this.
  */
  propTypes: {
    onDragStart: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      isDraggable: false,
      maxWidth: 375,
      targetPos: { x: 6, y: 6 }
    };

  },

  toKey(coords) {
    return `${coords.x}_${coords.y}`;
  },

  getInitialState: function() {
    // TODO: 1.6 is the current aspect ratio of the flavour map; refactor this magic number
    var newTargetPos = calculateFlavourMapCoords(this.props.targetPos.x,
                                                 this.props.targetPos.y,
                                                 this.props.maxWidth,
                                                 this.props.maxWidth/1.6);
    return {
      maxWidth:  this.props.maxWidth,
      targetPos: newTargetPos,
      mapKey: this.toKey(newTargetPos)
    };
  },

  componentDidMount() {
    // TODO: add event listener for page resize, currently the page must be refreshed
    // for this to update after a window size change.
    // TODO: this doesn't center properly because of the dynamic screen size
    var node                   = ReactDOM.findDOMNode(this);
    var nodeRenderedWidth      = node.offsetWidth;
    var renderedTargetDiameter = node.childNodes[0].offsetWidth;
    var newTargetPos           = calculateFlavourMapCoords(this.props.targetPos.x, this.props.targetPos.y, nodeRenderedWidth, nodeRenderedWidth/1.6);
    var newTargetPos           = { x: newTargetPos.x - (renderedTargetDiameter/2), y: newTargetPos.y - (renderedTargetDiameter/2)};

    console.log(`_flavour_map_embedded componentDidMount() setState -> targetPos=${newTargetPos.x},${newTargetPos.y}`);
    this.setState({
      maxWidth: nodeRenderedWidth,
      targetPos: newTargetPos,
      mapKey: this.toKey(newTargetPos)
    });
  },

  componentWillReceiveProps(nextProps) {
    if(nextProps.targetPos.x !== this.props.targetPos.x ||
       nextProps.targetPos.y !== this.props.targetPos.y ||
       nextProps.maxWidth    !== this.props.maxWidth) {

       // TODO: DRY up this code here and in componentDidMount
       var node                   = ReactDOM.findDOMNode(this);
       var nodeRenderedWidth      = node.offsetWidth;
       var renderedTargetDiameter = node.childNodes[0].offsetWidth;
       var newTargetPos           = calculateFlavourMapCoords(nextProps.targetPos.x, nextProps.targetPos.y, nodeRenderedWidth, nodeRenderedWidth/1.6);
       var newTargetPos           = { x: newTargetPos.x - (renderedTargetDiameter/2), y: newTargetPos.y - (renderedTargetDiameter/2)};
       console.log(`_flavour_map_embedded componentDidMount() setState -> targetPos=${newTargetPos.x},${newTargetPos.y}`);
       this.setState({
         maxWidth: nodeRenderedWidth,
         targetPos: newTargetPos,
         mapKey: this.toKey(newTargetPos)
       });
    } // if nextProps != this.props
  },

  handleTargetStop(event, ui) {
    // handle any action the parent component wants to take when the user finishes
    // dragging. for the flavour map index page, this results in the welcome message
    // disappearing and the beer list appearing. As a result, this will also trigger
    // the beer list to re-render.

    //console.log("Target position: " + this.state.targetPos.x + "," + this.state.targetPos.y);

    var newCoords = calculateDbCoords(this.state.targetPos.x,
                                      this.state.targetPos.y,
                                      this.state.maxWidth,
                                      this.state.maxWidth/1.6);

    console.log("Db position: " + newCoords.x + "," + newCoords.y);

    if(this.props.onDragStop !== undefined) {
      this.props.onDragStop(newCoords);
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
    console.log(`_flavour_map_embedded render() targetPos=${this.state.targetPos.x},${this.state.targetPos.y}`);
    return (
      <div id="flavour-map-embedded" style={styles} key={this.state.mapKey}>
        <Draggable
          bounds="parent"
          cancel={this.props.isDraggable ? "" : ".handle"}
          handle=".handle"
          onDrag={this.handleTargetDrag}
          onStop={this.handleTargetStop}
          start={this.state.targetPos}
          zIndex={100}>
          <div id="target" className="handle"></div>
        </Draggable>
        <img src="/images/flavour_map.svg" style={styles} draggable={false}/>
      </div>
    );
  },
});
