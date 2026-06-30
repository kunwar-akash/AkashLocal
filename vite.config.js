import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
    build: {
        // Target modern browsers — no legacy polyfills, smaller output
        target: 'esnext',
        // esbuild is faster and produces smaller output than terser
        minify: 'esbuild',
        // Split CSS per chunk so each lazy route only loads its CSS
        cssCodeSplit: true,
        // Raise the warning limit since framer-motion vendor chunk will exceed 500KB
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                // Split vendors into stable, cacheable chunks.
                // Stable = their hash only changes when the library version changes,
                // not when app code changes. This maximises browser cache hits.
                manualChunks(id) {
                    // React runtime — nearly always cached after first visit
                    if (id.includes('/node_modules/react/') ||
                        id.includes('/node_modules/react-dom/')) {
                        return 'vendor-react';
                    }
                    // Router — stable, shared across all routes
                    if (id.includes('/node_modules/react-router') ||
                        id.includes('/node_modules/@remix-run/')) {
                        return 'vendor-router';
                    }
                    // Framer Motion — heaviest dep, isolate so app changes don't bust its cache
                    if (id.includes('/node_modules/framer-motion/')) {
                        return 'vendor-motion';
                    }
                    // react-helmet-async + intersection observer — used in every page
                    if (id.includes('/node_modules/react-helmet-async/') ||
                        id.includes('/node_modules/react-intersection-observer/')) {
                        return 'vendor-head';
                    }
                    // Form libraries — only loaded with the Contact page lazy chunk
                    if (id.includes('/node_modules/react-hook-form/') ||
                        id.includes('/node_modules/@hookform/') ||
                        id.includes('/node_modules/zod/')) {
                        return 'vendor-form';
                    }
                    // Tiny utilities — clsx, tailwind-merge, cva, sonner
                    if (id.includes('/node_modules/clsx/') ||
                        id.includes('/node_modules/tailwind-merge/') ||
                        id.includes('/node_modules/class-variance-authority/') ||
                        id.includes('/node_modules/sonner/')) {
                        return 'vendor-utils';
                    }
                },
            },
        },
    },
    // Pre-bundle heavy deps so dev-server requests are fast
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
    },
});
