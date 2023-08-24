// Listen for custom events dispatched from the page's context
// @ts-nocheck
import { DATA_INPUT_ID, LOCAL_DATA_STORAGE_KEY } from "./constants";

const data = {
  settings: {},
};

(() => {
  chrome.storage.local.get(LOCAL_DATA_STORAGE_KEY, (result) => {
    if (result[LOCAL_DATA_STORAGE_KEY])
      data.settings = JSON.parse(result[LOCAL_DATA_STORAGE_KEY]);
  });
})();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "save-settings") {
    chrome.storage.local.set({ [LOCAL_DATA_STORAGE_KEY]: message.data }, () => {
      data.settings = JSON.parse(message.data);
    });
  }
});

const scriptToExec = () => {
  setTimeout(() => {
    const input = document.getElementById(DATA_INPUT_ID);
    if (input) {
      input.setAttribute("value", JSON.stringify(data.settings || {}) || "{}");
      input.dispatchEvent(new CustomEvent("change"));
    }
  });
};

chrome.tabs.onUpdated.addListener((activeInfo) => {
  if (chrome.tabs)
    chrome.tabs.get(activeInfo, function (tab) {
      if (tab.url && !tab.url.includes("gist.github.com")) return;
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: scriptToExec,
        })
        .then(() => console.log("injected a function"));
    });
});
