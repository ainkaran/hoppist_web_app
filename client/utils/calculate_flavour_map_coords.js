module.exports = function(flavour_x, colour_y, map_width, map_height) {
  const FLAVOUR_SCALE = 12;
  const COLOUR_SCALE  = 12;
  var mapX = (flavour_x/FLAVOUR_SCALE)*map_width;
  // we have to invert the value of Y here because the colour is stored in
  // the db as light=12, dark=0, but it's the opposite on our map.
  var mapY = ((COLOUR_SCALE - colour_y)/12)*map_height;
  return {
    x: mapX,
    y: mapY
  };
};
