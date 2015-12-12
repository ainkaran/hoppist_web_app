'use strict'
var expect = require("expect.js");
var calculate_db_coords = require("../../utils/calculate_db_coords");

expect(
  calculate_db_coords(440, 0, 440, 275)
  ).to.eql(
    {x: 12, y: 12}
  );


expect(
  calculate_db_coords(146.6666667, 183.3333333, 440, 275)
  ).to.eql(
    {x: 4, y: 4}
  );


expect(
  calculate_db_coords(220, 0, 440, 275)
  ).to.eql(
    {x: 6, y: 12}
  );

expect(
  calculate_db_coords(0, 275, 440, 275)
  ).to.eql(
    {x: 0, y: 0}
  );


console.log("calculate db coords passed");
