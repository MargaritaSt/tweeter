
  //$("textarea").on('keydown', function(event) {
 //   let text = $(this).parent().children('.tweet-text').val();
  //  $(this).parent().children().children('.counter').html(text.length + 1);

$(document).ready(function() {
  $("#tweet-text").keyup(function(events)  {
    $("output.counter").text(140 - this.value.length);
    const log = this.value.length;
    if (log > 140) {
      $("output.counter").addClass("error");
    } else {
      $("output.counter").removeClass("error");
    }
  });
});