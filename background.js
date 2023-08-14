chrome.runtime.onInstalled.addListener(() => {

    chrome.storage.local.set({"br_token_active":true});
  });
  