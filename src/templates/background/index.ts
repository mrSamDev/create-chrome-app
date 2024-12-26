export function createBackgroundTemplate(): string {
  return `
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_DATA") {
    sendResponse({ data: "Response from background script" });
  }
});

  `;
}
