const path = require("path")
const webpack = require('webpack')
const withSourceMaps = require('@zeit/next-source-maps')

module.exports = withSourceMaps({
  webpack(config, { buildId, isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~client": path.resolve(__dirname, "./src"),
      "~utils": path.resolve(__dirname, "./utils")
    }
    // for sentry
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.APP_RELEASE': JSON.stringify(buildId)
      })
    )
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/browser'
    }
    return config
  }
})
