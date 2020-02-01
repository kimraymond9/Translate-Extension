"use strict";
var apiKey = "";

function onClickHandler(info, tab) {
  chrome.storage.sync.get("language", function(data) {
    var detectedLanguage;
    $.ajax({
      type: "POST",
      url: "https://www.googleapis.com/language/translate/v2/detect",
      dataType: "json",
      data: {
        key: apiKey,
        q: info.selectionText
      },
      success: function(result) {
        if (!result.error) {
          detectedLanguage = result.data.detections[0][0].language;
        }
      }
    });

    $.ajax({
      type: "POST",
      url: "https://www.googleapis.com/language/translate/v2",
      dataType: "json",
      data: {
        key: apiKey,
        source: detectedLanguage,
        target: data.language,
        q: info.selectionText
      },
      success: function(result) {
        if (!result.error) {
          chrome.tabs.query({ active: true, currentWindow: true }, function(
            tabs
          ) {
            chrome.tabs.sendMessage(
              tabs[0].id,
              {
                result: result.data.translations[0].translatedText,
                type: "openModal"
              },
              function(response) {}
            );
          });
          console.log(result.data.translations[0].translatedText);
        }
      }
    });
  });
}

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
  var title = "Translate";
  var id = chrome.contextMenus.create({
    title: title,
    contexts: ["selection"],
    id: "context selection"
  });

  chrome.storage.sync.set({ language: "da" }, function() {});
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
