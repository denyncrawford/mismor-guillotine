/**
 * 参考链接: https://github.com/vitejs/vite/blob/master/src/node/config.ts
 * 直接 cmd+左键 点进配置项查看即可
 */
import { join } from 'path'
import { UserConfig } from 'vite'
import dotenv from 'dotenv'
import ViteFonts from 'vite-plugin-fonts'

dotenv.config({ path: join(__dirname, '.env') })
const root = join(__dirname, 'src/render')

const config: UserConfig = {
  root,
  port: +process.env.PORT,
  base: './',
  outDir: join(__dirname, 'dist/render'),
  alias: {
    // 别名必须以 / 开头、结尾
    '/@/': root,
  },
  rollupInputOptions: {
    external: ''
  },
  optimizeDeps: {
    auto: true,
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
  cssPreprocessOptions: {
    sass: {
      modifyVars: {
        '$custom-success-color': '#00c13c',
        '$custom-font-color': '#333333',
        '$custom-info-color': '#999999',
        '$custom-tag-color': '#f5f5f5',
        '$custom-danger-color': '#ee3300',
      }
    }
  },
  plugins: [
    ViteFonts({
      google: {
        families: ['Inter']
      }
    })
  ]
}

export default config
