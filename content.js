chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.type) {
    case "openModal":
      var iframe = document.createElement("iframe");
      iframe.src = chrome.extension.getURL("modal.html");
      iframe.id = "myFrame";

      // add stylings to position the iframe'd modal in the middle of the screen
      iframe.style.position = "fixed";
      iframe.style.zIndex = 99999;
      iframe.style.top = "0%";
      iframe.style.left = "0%";
      iframe.style.width = "100%";
      iframe.style.height = "100%";

      iframe.frameBorder = 0;
      document.body.append(iframe);
      iframe.onload = function() {
        iframe.contentWindow.postMessage(
          { type: "sendTranslation", result: message.result },
          "*"
        );
      };
      break;
  }
});

window.addEventListener("message", function(event) {
  if (event.data.type == "deleteFrame") {
    console.log("deleteFrame");
    var frame = window.parent.document.getElementById("myFrame");
    frame.parentNode.removeChild(frame);
  }
});
