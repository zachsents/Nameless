import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            ...(mode == "development" && { "nameless-graph-exec": path.resolve(__dirname, "../execution") })
        }
    }
})
