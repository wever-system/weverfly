import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";
import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
import { SANDBIRD_APP_ID } from "../../../../electron/db/db";
const myColorSet = {
    '--sendbird-dark-primary-500': '#00487c',
    '--sendbird-dark-primary-400': '#4bb3fd',
    '--sendbird-dark-primary-300': '#3e6680',
    '--sendbird-dark-primary-200': '#0496ff',
    '--sendbird-dark-primary-100': '#027bce',
};
const Chat = () => {
const [macAddress,setMacAddress] = useState<string>('')
    useEffect(() => {
        const mac = localStorage.getItem("mac")
        console.log("mac", mac)
        setMacAddress(mac||"test")
    },[])
    useEffect(() => {
        ipcRenderer.on("receive-mac-ip", (_, message) => {
            setMacAddress(message);
        });
        ipcRenderer.send("get-mac-ip");
      }, []);
  return (
    <>
    {macAddress && 
      <div style={{ width: "100%", height: "100vh" }}>
        <SendbirdApp
            colorSet={myColorSet}
          appId={SANDBIRD_APP_ID}
          userId={macAddress}
          allowProfileEdit={true}
          theme={"dark"}
        />
      </div>
}
    </>
  );
};

export default Chat;
