const path = require("path")

module.exports = {
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~": path.resolve("packages")
    }
    return config
  }
}
