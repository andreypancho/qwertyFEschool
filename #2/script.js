window.onload = function() {
  //homework #1
  $(".button-reg button").click(function() {
    $("#modal-reg").hide("slow");
  });
  $(".button-login button").click(function() {
    $("#modal-login").hide("slow");
  });
  $(".Reg").click(function() {
    $("#modal-reg").show("slow");
  });
  $(".Login").click(function() {
    $("#modal-login").show("slow");
  });

  //homework #2
  $(".sidebar").attr("val", "true");
  $("#burger").click(function() {
    if ($(".sidebar").attr("val") == "false") {
      $(".sidebar").show("slow");
      $(".sidebar").attr("val", "true");
    } else if ($(".sidebar").attr("val") == "true") {
      $(".sidebar").hide("slow");
      $(".sidebar").attr("val", "false");
    }
  });

  $("#fontSize").change(function() {
    var a = $("#fontSize").val();
    if (Math.ceil(a) - a > 0) {
      $("#error").html("Введите целое число!!!");
      return;
    } else {
      $("#error").html("");
    }
    if (a >= 8 && a <= 24) {
      $(".content").css("font-size", "" + a + "px");
    }
  });

  $("#backgroundColor").change(function() {
    var b = $("#backgroundColor option:selected").val();
    $(".content").css("background", "" + b + "");
  });

  $("#fontFamily").change(function() {
    var c = $("#fontFamily option:selected").val();
    $(".content").css("font-family", "" + c + "");
  });

  $("#deleteP").click(function() {
    $("p")
      .last()
      .remove();
  });
};
