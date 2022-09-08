import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            ...(mode == "development" && { "graph-execution-engine-2": path.resolve(__dirname, "../execution2") }),
            // "firebase-nodes-plugin": path.resolve(__dirname, "../firebase")
        }
    }
})
