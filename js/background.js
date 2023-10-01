// Listen for tab updates (e.g., page load completion)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the page has finished loading and the URL starts with "http"
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    // Define the script to be executed
    const scriptDetails = {
      target: { tabId },
      files: ['./js/content.js'],
    };

    // Execute the content script
    chrome.scripting
      .executeScript(scriptDetails)
      .then(() => {
        console.log('Content script injected successfully.');
      })
      .catch((err) => {
        console.error('Error injecting content script:', err);
      });
  }
});
