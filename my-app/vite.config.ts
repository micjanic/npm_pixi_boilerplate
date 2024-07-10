import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port: 8080,
    },
    build: {
        lib: {
            entry: path.resolve(
                __dirname,
                'src/components/create_pixi_project.tsx'
            ),
            name: '@micjanic/create_pixi_project',
            fileName: (format) => `create_pixi_project.${format}.js`,
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                '@pixi/react',
                'pixi.js',
                'tailwindcss',
            ],
            output: {
                assetFileNames: 'assets/[name].[hash][extname]',
                globals: {
                    react: 'React',
                    '@pixi/react': 'PIXIReact',
                    'pixi.js': 'PIXI',
                },
            },
        },
        outDir: 'dist',
        sourcemap: true,
    },
    plugins: [react()],
})
