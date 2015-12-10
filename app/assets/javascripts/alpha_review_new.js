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


  $("#flavour-gradient").on("click", function() {
    var docWidth = $(document).width();
    var clickedAt = event.clientX;
    var spanId = Math.ceil((clickedAt/docWidth)*12)

    $("#review_flavour_rating").val(spanId);
    $("#flavour-rating-display").html(spanId);
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


  $("#colour-gradient").on("click", function() {
    var docWidth = $(document).width();
    var clickedAt = event.clientX;
    var spanId = Math.ceil((clickedAt/docWidth)*12)

    $("#review_colour_rating").val(spanId);
    $("#colour-rating-display").html(spanId);
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

  $("#skip-button").on("click",function () {
    event.preventDefault();
    location.reload();
  });

}); // document ready
