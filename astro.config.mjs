import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://focus.theworkdocs.com',
  integrations: [
    react(),
    AstroPWA({
      manifest: {
        background_color: '#121923',
        description:
          'Focus by The Work Docs. Ambient sounds and simple tools for calmer work.',
        display: 'standalone',
        icons: [
          ...[72, 128, 144, 152, 192, 256, 512].map(size => ({
            sizes: `${size}x${size}`,
            src: `/assets/pwa/${size}.png?v=focus`,
            type: 'image/png',
          })),
        ],
        name: 'Focus by The Work Docs',
        orientation: 'any',
        scope: '/',
        short_name: 'Focus',
        start_url: '/',
        theme_color: '#121923',
      },
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*'],
        maximumFileSizeToCacheInBytes: Number.MAX_SAFE_INTEGER,
        navigateFallback: '/',
      },
    }),
  ],
});
