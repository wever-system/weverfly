import {
  app,
  BrowserWindow,
  clipboard,
  globalShortcut,
  ipcMain,
  Notification,
} from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import macaddress from "macaddress";

import { getData, updateClipboard } from "./service/clipboard";
import net from "net";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
let macIp: string | null = null;

const connectSocket = () => {
  const client = net.createConnection(
    { host: "15.165.216.111", port: 26291 },
    () => {
      console.log("connected to chat server!");
    }
  );

  client.on("data", (data) => {
    const [sender, message, profile_url, receiver] = data
      .toString()
      .split("##__@");

    if (receiver.indexOf(macIp as string) >= 0) {
      const notification = new Notification({
        title: `${sender}`,
        body: `${message}`,
        icon: `${profile_url}`,
      });
      notification.show();
    }
  });

  client.on("end", () => {
    console.log("서버와의 연결이 종료되었습니다.");
  });

  client.on("error", (err) => {
    console.error(`소켓 오류: ${err}`);
  });
};
function createWindow() {
  macaddress.one((err, mac) => {
    if (err) {
      console.error(err);
      return;
    }
    macIp = mac;
  });
  win = new BrowserWindow({
    icon: path.join(__dirname, "assets/mainIcon.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    transparent: true,
    width: 940,
    height: 600,
    minWidth: 940,
    minHeight: 600,
  });

  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on("second-instance", () => {
      if (win) {
        win.focus();
      }
    });
  }
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

ipcMain.on("minimize-app", () => {
  win?.minimize();
});

ipcMain.on("close-app", () => {
  win?.hide();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app
  .whenReady()
  .then(() => {
    globalShortcut.register("CommandOrControl+`", async () => {
      const text = clipboard.readText();
      if (text) {
        const res = await updateClipboard(text, macIp as string);
        if (res) {
          win?.webContents.send(
            "clipboard-data",
            await getData(macIp as string)
          );
        }
      }
    });
  })
  .then(createWindow)
  .then(connectSocket);

ipcMain.on("clipboard-data", async (event) => {
  event.sender.send("clipboard-data", await getData(macIp as string));
});

ipcMain.on("clipboard-change", async (_, ...args) => {
  clipboard.writeText(args[0]);
});

ipcMain.on("get-mac-ip", (event) => {
  event.sender.send("receive-mac-ip", macIp);
});

ipcMain.on("change-opacity", async (_, ...args) => {
  win?.setOpacity(args[0] as number);
});
