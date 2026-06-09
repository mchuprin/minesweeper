import { defineConfig } from 'vite'
import { buildPlugins } from './build/vite/buildPlugins'
import path from 'path'

export default defineConfig({
  plugins: buildPlugins(),
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, 'public/assets')
    }
  }
})
