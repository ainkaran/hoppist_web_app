'use strict'
var expect = require("expect.js");
var calculate_flavour_map_coords = require("../../utils/calculate_flavour_map_coords");

expect(
  calculate_flavour_map_coords(12, 12, 440, 275)
  ).to.eql(
    {x: 440, y: 0}
  );


// test for floats
var result = calculate_flavour_map_coords(4, 4, 440, 275)
expect(result.x).to.be.within(146.6, 146.7);
expect(result.y).to.be.within(183.3, 183.4);


expect(
  calculate_flavour_map_coords(6, 12, 440, 275)
  ).to.eql(
    {x: 220, y: 0}
  );

expect(
  calculate_flavour_map_coords(0, 0, 440, 275)
  ).to.eql(
    {x: 0, y: 275}
  );


console.log("calculate flavour map coords passed");
