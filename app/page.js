/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

export default function Home() {
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    const handleScreenRecord = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.runtime.sendMessage({ name: "startRecording" });
      });
    };
  }, [recording]);

  //const stopScreenRecord = async () => {
  //  setRecording(false);
  //  chrome.runtime.sendMessage({
  //   type: 'recordingStopped',
  // });
  // };

  // chrome.runtime.onMessage.addListener((message) => {
  // if (message.type === 'recordingComplete') {
  // The recording is complete
  // Do something with the recorded video here, such as save it to the user's computer or upload it to a server
  // }
  //  });

  return (
    <main className="w-[300px] h-[450px] px-[24px] pb-[20px] pt-[18px] inline-flex justify-center bg-transparent rounded-[32px] flex-col space-y-5 shadow-lg">
      <div className="flex items-center w-full justify-between">
        <div className="flex items-center justify-between gap-2">
          <img src="/icons/help_logo.svg" alt="HelpMeOut" />
          <span className="text-[#120B48] font-bold text-base">HelpMeOut</span>
        </div>
        <div className="flex items-center">
          <Button className="p-2" variant="ghost">
            <img src="/icons/setting-2.svg" alt="settings" />
          </Button>
          <Button className="p-2" variant="ghost">
            <img src="/icons/close-circle.svg" alt="close" />
          </Button>
        </div>
      </div>
      <div className="text-[#120B48] font-normal text-sm">
        This extension helps you record and share helpful videos with ease.
      </div>
      <div className="flex w-full items-center justify-evenly">
        <Button variant="ghost" className="flex flex-col h-fit">
          <img src="/icons/monitor.svg" alt="full screen" />
          <span className="text-[#928FAB]">Full screen</span>
        </Button>
        <Button variant="ghost" className="flex flex-col h-fit">
          <img src="/icons/tab.svg" alt="current tab" />
          <span className="font-bold text-[#120B48]">Current Tab</span>
        </Button>
      </div>
      <div className="flex items-center justify-between text-sm font-semibold h-10 py-2 px-4 text-[#120B48] rounded-[8px] border-[1.5px] border-[#120B48]">
        <div className="flex items-center gap-3">
          <img src="/icons/video-camera.svg" alt="" />
          Camera
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between text-sm font-semibold h-10 py-2 px-4 text-[#120B48] rounded-[8px] border-[1.5px] border-[#120B48]">
        <div className="flex items-center gap-3">
          <img src="/icons/microphone.svg" alt="" />
          Audio
        </div>
        <Switch className="" />
      </div>
      <Button
        //     onClick={handleScreenRecord}
        className="bg-[#120B48] text-white rounded-[12px]"
      >
        Start Recording
      </Button>
      <Button
        //       onClick={stopScreenRecord}
        disabled={!recording}
        className="bg-[#120B48] text-white rounded-[12px]"
      >
        Stop Recording
      </Button>
    </main>
  );
}
