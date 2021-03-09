/**
 * 参考链接: https://github.com/vitejs/vite/blob/master/src/node/config.ts
 * 直接 cmd+左键 点进配置项查看即可
 */
import { join } from 'path'
import { UserConfig } from 'vite'
import dotenv from 'dotenv'
import ViteFonts from 'vite-plugin-fonts'
import vue from '@vitejs/plugin-vue'

dotenv.config({ path: join(__dirname, '.env') })
const root = join(__dirname, 'src/render')

const config: UserConfig = {
  root,
  resolve: {
    alias: {
      '/@': root,
    }
  },
  base: './',
  build: {
    outDir: join('../../dist/render'),
    emptyOutDir: true
  },
  server: {
    port: +process.env.PORT,
  },
  optimizeDeps: {
    exclude: [
      'electron-is-dev',
      'electron-store',
      'mongodb',
      'fs-extra',
      'sharp',
      'jspdf',
      'node-hid',
      'native-barcode-scanner',
      'pdf-to-printer',
      'fs',
      'json2csv'
    ],
    include: [
      'element-plus/lib/locale/lang/es',
      'dayjs/plugin/duration.js',
      'dayjs/plugin/customParseFormat.js'
    ]
  },
  plugins: [
    ViteFonts({
      google: {
        families: ['Inter']
      }
    }),
    vue(),
  ]
}

export default config
