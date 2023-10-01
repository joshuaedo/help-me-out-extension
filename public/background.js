// background.js

let recording = false;
let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startRecording") {
    startRecording();
  } else if (message.action === "stopRecording") {
    stopRecording();
  }
});

function startRecording() {
  const desktopMediaStreamOptions = {
    audio: false, // Set to true if you want to include audio
    video: {
      mandatory: {
        chromeMediaSource: "screen",
        maxWidth: screen.width,
        maxHeight: screen.height,
      },
    },
  };

  chrome.desktopCapture.chooseDesktopMedia(
    ["screen", "window"],
    chrome.runtime.getURL("your_extension_icon.png"), // Icon shown in the permission dialog
    (streamId) => {
      if (!streamId) {
        console.error("Permission denied.");
        return;
      }

      navigator.mediaDevices
        .getUserMedia({ audio: false, video: { mandatory: { chromeMediaSourceId: streamId } } })
        .then((stream) => {
          mediaStream = stream;
          mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
          };
          mediaRecorder.onstop = () => {
            const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });

            // You can now send `recordedBlob` to your endpoint or do further processing

            // Reset variables for future recordings
            recordedChunks = [];
            mediaStream.getTracks().forEach((track) => track.stop());
            recording = false;
          };
          mediaRecorder.start();
          recording = true;
        })
        .catch((error) => {
          console.error("Error accessing screen:", error);
        });
    }
  );
}

function stopRecording() {
  if (mediaRecorder && recording) {
    mediaRecorder.stop();
  }
}
