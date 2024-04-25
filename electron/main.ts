import { app, BrowserWindow, clipboard, globalShortcut, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import macaddress from "macaddress";
import sqlExcute from "./db/sqlExcute";
import { getData, updateClipboard } from "./service/clipboard";
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
function createWindow() {
  macaddress.one((err, mac) => {
    if (err) {
      console.error(err);
      return;
    }
    macIp = mac;
    console.log("macIp", macIp);
  });
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    frame: false,
    transparent: true,
  });

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
  win?.close();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+`",async () => {
    const text = clipboard.readText();
    if (text) {
      const res = await updateClipboard(text, macIp as string);
      if(res) {
        win?.webContents.send("clipboard-data", await getData(macIp as string))
      }
    }
  });
}).then(createWindow);

ipcMain.on("clipboard-data",async (event) => {
  event.sender.send("clipboard-data", await getData(macIp as string));
})