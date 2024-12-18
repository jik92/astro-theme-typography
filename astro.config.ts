import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import swup from '@swup/astro'
import {defineConfig, passthroughImageService} from 'astro/config'
import robotsTxt from 'astro-robots-txt'
import UnoCSS from 'unocss/astro'
import {themeConfig} from './src/.config'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// https://astro.build/config
export default defineConfig({
    site: themeConfig.site.website,
    prefetch: true,
    base: '/',
    markdown: {
        remarkPlugins: [
            remarkMath,
        ],
        rehypePlugins: [
            rehypeKatex,
        ],
        shikiConfig: {
            theme: 'dracula',
            wrap: true,
        },
    },
    integrations: [
        UnoCSS({injectReset: true}),
        mdx({
            remarkPlugins: [
                remarkMath,
            ],
            rehypePlugins: [
                rehypeKatex,
            ],
        }),
        robotsTxt({
            policy: [
                {
                    userAgent: '*',
                    disallow: '/',
                }]
        }),
        sitemap(),
        swup({
            theme: false,
            animationClass: 'transition-swup-',
            cache: true,
            preload: true,
            accessibility: true,
            smoothScrolling: true,
            updateHead: true,
            updateBodyClass: true,
        })
    ],
    vite: {
        server: {
            watch: {
                // avoiding WSL2 cant to reload it. - https://github.com/vitejs/vite/issues/5878
                usePolling: true
            },
        },
    },
    image: {
        service: passthroughImageService(),
    },
})
