document.addEventListener('DOMContentLoaded', () => {
  const startVideoButton = document.querySelector('#start_video');
  const stopVideoButton = document.querySelector('#stop_video');

  // Add event listeners
  startVideoButton.addEventListener('click', async () => {
    // Get the active tab
    const activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Send a message to the active tab to request video recording
    await chrome.tabs.sendMessage(activeTab[0].id, {
      action: 'request_recording',
    });

    // Receive the response from the active tab
    const response = await chrome.tabs.query(
      { active: true, currentWindow: true },
      [{ message: 'response' }]
    );

    // Log the response if there is no error
    if (!chrome.runtime.lastError) {
      console.log(response);
    } else {
      // Log the error
      console.log(chrome.runtime.lastError, 'error line 14');
    }
  });

  stopVideoButton.addEventListener('click', async () => {
    // Get the active tab
    const activeTab = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Send a message to the active tab to stop video recording
    await chrome.tabs.sendMessage(activeTab[0].id, {
      action: 'stop_recording',
    });

    // Receive the response from the active tab
    const response = await chrome.tabs.query(
      { active: true, currentWindow: true },
      [{ message: 'response' }]
    );

    // Log the response if there is no error
    if (!chrome.runtime.lastError) {
      console.log(response);
    } else {
      // Log the error
      console.log(chrome.runtime.lastError, 'error line 27');
    }
  });
});
