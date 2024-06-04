import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    root: 'src',
    build: {
        outDir: path.resolve(__dirname, 'dist'), // Ensure outDir is inside the project root
        rollupOptions: {
        input: {
            main: path.resolve(__dirname, 'src/index.html'),
        },
        },
    },
    server: {
        proxy: {
        '/': {
            target: 'http://localhost:8000', // Your PHP server address
            changeOrigin: true,
        },
        },
    },
})