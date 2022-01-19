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
