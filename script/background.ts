// Listen for custom events dispatched from the page's context
// @ts-nocheck
import {
  DATA_INPUT_ID,
  LOCAL_DATA_STORAGE_KEY,
  HAS_JOINED_INPUT_ID,
} from "./constants";

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

const scriptToExec = (data) => {
  setTimeout(() => {
    const input = document.getElementById(DATA_INPUT_ID);
    if (input) {
      input.setAttribute("value", JSON.stringify(data.settings || {}) || "{}");
      input.dispatchEvent(new CustomEvent("change"));
    }
  });
};

const sendJoinCallEvent = () => {
  const has_joined_input = document.getElementById(HAS_JOINED_INPUT_ID);
  if (!has_joined_input) {
    document.dispatchEvent(new CustomEvent("wfh-joined"));
  } else if (has_joined_input.value === "false") {
    document.dispatchEvent(new CustomEvent("wfh-joined"));
    has_joined_input.value = "true";
  }
};

const sendLeaveCallEvent = () => {
  document.dispatchEvent(new CustomEvent("wfh-left"));
};

let timeout = null;

chrome.tabs.onUpdated.addListener((activeInfo) => {
  if (chrome.tabs)
    chrome.tabs.get(activeInfo, function (tab) {
      if (tab.url && !tab.url.includes("meet.google.com")) return;
      chrome.scripting
        .executeScript({
          args: [data],
          target: { tabId: tab.id },
          func: scriptToExec,
        })
        .then(() => {
          chrome.webRequest.onBeforeRequest.addListener(
            (details) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                console.log(details);
                if (details.url.includes("join_call")) {
                  chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: sendJoinCallEvent,
                  });
                }
                if (details.url.includes("leave_call")) {
                  chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: sendLeaveCallEvent,
                  });
                }
              }, 100);
            },
            {
              urls: ["https://www.gstatic.com/meet/sounds/*"],
              tabId: tab.id,
              types: ["media"],
            },
            ["requestBody"]
          );
        });
    });
});
