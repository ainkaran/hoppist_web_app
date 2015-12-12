'use strict'
// TODO: refactor this and calculate_flavour_map_coords into one class
// this would be ideal because they're very similar, and they share constants
module.exports = function(flavour_x, colour_y, map_width, map_height) {
  const FLAVOUR_SCALE = 12;
  const COLOUR_SCALE  = 12;
  var dbX = (flavour_x/map_width)*FLAVOUR_SCALE;
  // we have to invert the value of Y here because the colour is stored in
  // the db as light=12, dark=0, but it's the opposite on our map.
  var dbY = COLOUR_SCALE - ((colour_y/map_height)*12)
  return {
    x: Math.round(dbX),
    y: Math.round(dbY)
  };

};
