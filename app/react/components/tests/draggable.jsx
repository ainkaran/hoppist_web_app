'use strict'
var Draggable = require('react-draggable');

module.exports = React.createClass({
	getInitialState() {
		return { dragKey: "init", position: {x: 10, y: 20} }
	},

	handleStart: function (event, ui) {
		console.log('Event: ', event);
		console.log('Position: ', ui.position);
	},

	handleDrag: function (event	, ui) {
		console.log('Event: ', event);
    console.log('Position: ', ui.position);
	},

	handleStop: function (event, ui) {
		console.log('Event: ', event);
    console.log('Position: ', ui.position);
	},

	updatePosition() {
		var x = Math.random() * 500;
		var y = Math.random() * 500;
		var newKey = `${x}-${y}`
		console.log(`new position: ${x}, ${y}`);
		// This is the way to force the damn thing to update!!
		this.setState({ dragKey: `${newKey}`, position: { x: x, y: x }});
	},

	render: function () {

		return (
			<div style={{background:"whitesmoke",width:"500px",height:"500px"}} key={this.state.dragKey}>
				<div style={{background:"blue",width:"100px",height:"40px"}} onClick={this.updatePosition}></div>
			<Draggable
				bounds="parent"
				handle=".handle"
				onDrag={this.handleDrag}
				onStop={this.handleStop}
				start={this.state.position}
				zIndex={100}>
				<div id="target" className="handle" style={{background:"red", width:"50px", height:"50px"}}></div>
			</Draggable>
			</div>
		);
	}
});
