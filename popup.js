"use strict";

let translateWords = document.getElementById("translateWords");

translateWords.onclick = function() {
  chrome.runtime.openOptionsPage(function() {});
};
