"use strict";

const languages = [
  {
    language: "Danish",
    code: "da"
  },
  {
    language: "English",
    code: "en"
  },
  {
    language: "Spanish",
    code: "es"
  },
  {
    language: "French",
    code: "fr"
  },
  {
    language: "Italian",
    code: "it"
  },
  {
    language: "Dutch",
    code: "nl"
  },
  {
    language: "Portuguese",
    code: "pt"
  },
  {
    language: "Chinese Simplified",
    code: "zh-CN"
  },
  {
    language: "Chinese Traditional",
    code: "zh-TW"
  },
  {
    language: "Korean",
    code: "ko"
  },
  {
    language: "Japanese",
    code: "ja"
  },
  {
    language: "Thai",
    code: "th"
  }
];

var chooseLanguage = document.getElementById("chooseLanguage"),
  save = document.getElementById("save"),
  fragment = document.createDocumentFragment();

function setLanguage() {
  chrome.storage.sync.set({ language: chooseLanguage.value }, function() {
    console.log(chooseLanguage.value);
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function() {
      status.textContent = "";
    }, 750);
  });
}

function getLanguage() {
  chrome.storage.sync.get("language", function(data) {
    document.getElementById("chooseLanguage").value = data.language;
  });
}

function constructOptions(languages) {
  for (let i = 0; i < languages.length; i++) {
    let option = document.createElement("option");
    option.value = languages[i].code;
    option.appendChild(document.createTextNode(languages[i].language));
    fragment.appendChild(option);
  }
  chooseLanguage.appendChild(fragment);
  save.onclick = setLanguage;
}
constructOptions(languages);

document.addEventListener("DOMContentLoaded", getLanguage);
