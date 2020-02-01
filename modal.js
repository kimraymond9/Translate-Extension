$(document).ready(function() {
  $(".modal").modal({
    onOpenEnd: function(modal, trigger) {
      // Callback for Modal open. Modal and trigger parameters available.
    },
    onCloseStart: function() {
      // Callback for Modal close
      window.parent.postMessage({ type: "deleteFrame" }, "*");
    }
  });
  $("#modal1").modal("open");

  window.addEventListener("message", function(event) {
    if (event.data.type == "sendTranslation") {
      document.getElementById("translation").innerHTML = event.data.result;
    }
  });
});
