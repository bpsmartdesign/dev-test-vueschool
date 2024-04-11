// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxtjs/sitemap",
  ],
  nitro: {
    experimental: {
      database: true,
    },
  },
  routeRules: {
    "/": {
      ssr: false,
    },
  },
  image: {
    domaines: ["picsum.photos"],
  },
  site: {
    title: "VueSchool Blog",
    description:
      "Elevate your web development knowledge and become a Vue.js pro with VueSchool Blog",
    canonical: "https://vueschool-dev.vercell.app",
    openGraph: {
      site_name: "VueSchool Blog",
      type: "website",
      locale: "en_US",
      url: "https://vueschool-dev.vercell.app",
      title: "VueSchool Blog",
      image: "https://vueschool-dev.vercell.app/favicon.ico",
      description:
        "Elevate your web development knowledge and become a Vue.js pro with VueSchool Blog",
    },
    robots: {
      UserAgent: "*",
    },
  },
  sitemap: {
    hostname: "https://vueschool-dev.vercell.app",
    gzip: true,
  },
});
