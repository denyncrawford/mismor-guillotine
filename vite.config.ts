/**
 * 参考链接: https://vitejs.dev/config/
 */
import { join } from 'path'
import { UserConfig } from 'vite'
import dotenv from 'dotenv'
import vue from '@vitejs/plugin-vue'

dotenv.config({ path: join(__dirname, '.env') })
const root = join(__dirname, 'src/render')

const config: UserConfig = {
  root,
  resolve: {
    alias: {
      '/@/': root,
    }
  },
  base: './',
  build: {
    outDir: join('../../dist/render'),
    emptyOutDir: true,
    assetsInlineLimit: 0
  },
  server: {
    port: +process.env.PORT,
  },
  plugins: [
    vue()
  ],
  optimizeDeps: {
    exclude: [
      'electron-is-dev',
      'electron-store',
      'mongodb',
      'fs-extra',
      'jspdf',
      'native-barcode-scanner',
      'pdf-to-printer',
      'fs',
      'json2csv'
    ],
    include: [
      'element-plus/lib/locale/lang/es',
      'dayjs/plugin/duration.js',
      'dayjs/plugin/customParseFormat.js',
      'nanoid'
    ]
  },
}

export default config
