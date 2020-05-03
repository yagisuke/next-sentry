const path = require("path")

module.exports = {
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~client": path.resolve(__dirname, "./src")
    }
    return config
  }
}
