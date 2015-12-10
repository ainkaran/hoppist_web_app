$(function() {
  $("#stars").children().on("click",function(){
    var starId = $(this).attr("id");
    $("#review_star_rating").val(starId);
    var i = 1;
    while(i <= 5) {
      var selector = $("#stars > #" + i);
      if (i <= parseInt(starId)) {
        selector.addClass("glyphicon-star");
        selector.removeClass("glyphicon-star-empty");
      } else {
        selector.addClass("glyphicon-star-empty");
        selector.removeClass("glyphicon-star");
      }

      i++;
    }
  });


  $("#flavour-gradient div.col-xs-1").on("click", function() {
    var spanId = $(this).attr("id");
    $("#review_flavour_rating").val(spanId);
    var i = 1;
    while(i <= 12) {
      var selector = $("#flavour-gradient div.col-xs-1#" + i);
      if (i <= parseInt(spanId)) {
        selector.children("span.glyphicon").addClass("glyphicon-plus");
        selector.children("span.glyphicon").removeClass("glyphicon-minus");
      } else {
        selector.children("span.glyphicon").addClass("glyphicon-minus");
        selector.children("span.glyphicon").removeClass("glyphicon-plus");
      }

      i++;
    };
  });


  $("#colour-gradient div.col-xs-1").on("click", function() {
    var spanId = $(this).attr("id");
    $("#review_colour_rating").val(spanId);
    var i = 1;
    while(i <= 12) {
      var selector = $("#colour-gradient div.col-xs-1#" + i);
      if (i <= parseInt(spanId)) {
        selector.children("span.glyphicon").addClass("glyphicon-plus");
        selector.children("span.glyphicon").removeClass("glyphicon-minus");
      } else {
        selector.children("span.glyphicon").addClass("glyphicon-minus");
        selector.children("span.glyphicon").removeClass("glyphicon-plus");
      }

      i++;
    };
  });
});
