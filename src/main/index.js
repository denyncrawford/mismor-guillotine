/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '../../.env') })

let win = null

const createWin = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  })

  const URL = is_dev ?
    `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
    :
    `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址

  win.setMenuBarVisibility(false)
  win.loadURL(URL);
}

app.allowRendererProcessReuse = false;

app.whenReady().then(() => createWin())
