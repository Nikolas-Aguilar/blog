// const withMDX = require("@next/mdx")({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [],
//     rehypePlugins: [],
//     providerImportSource: "@mdx-js/react",
//   },
// });

function withMDX(obj) {
  return obj;
}

module.exports = withMDX({
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "pbs.twimg.com",
      "abs.twimg.com",
      "m.media-amazon.com",
      "images-na.ssl-images-amazon.com",
    ],
  },
  // headers() {
  //   return [
  //     {
  //       source: "/atom/:nested*",
  //       headers: [
  //         {
  //           key: "content-type",
  //           value: "text/xml",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // redirects() {
  //   return [
  //     {
  //       source: "/essays/:nested*",
  //       destination: "/",
  //       permanent: true,
  //     },
  //     {
  //       source: "/slackin/:nested*",
  //       destination: "https://github.com/rauchg/slackin",
  //       permanent: true,
  //     },
  //   ];
  // },
});
