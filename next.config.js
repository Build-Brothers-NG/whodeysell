const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  images: {
    domains: ["buildbrothers.com"],
  },
});

// module.exports = {
//   images: {
//     domains: ["buildbrothers.com"],
//   },
// };

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({
//   images: {
//     domains: ["buildbrothers.com"],
//   },
// });
