import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://focus.theworkdocs.com',
  trailingSlash: 'always',
  integrations: [
    react(),
    AstroPWA({
      manifest: {
        lang: 'vi',
        background_color: '#121923',
        description:
          'Focus by The Work Docs. Âm thanh thư giãn và công cụ giúp bạn tập trung.',
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
        // Precache both language pages without rewriting /en/ to the root page.
        navigateFallback: null,
        globPatterns: ['**/*'],
        maximumFileSizeToCacheInBytes: Number.MAX_SAFE_INTEGER,
      },
    }),
  ],
});
