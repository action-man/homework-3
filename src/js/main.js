$(document).ready(function() {

  $( "#slider" ).slider({
      value: 60,
      orientation: "horizontal",
      range: "min",
      animate: true
    });

  var spinner = $( ".spinner" ).spinner();

});