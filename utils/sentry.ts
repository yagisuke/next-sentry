import * as Sentry from '@sentry/node'

const NODE_ENV = process.env.NODE_ENV
const APP_RELEASE = process.env.APP_RELEASE

export default function init(release = APP_RELEASE) {
  Sentry.init({
    dsn:
      'https://ab2152f7103c4054a994ba07387f1650@o386252.ingest.sentry.io/5220305',
    release,
    environment: NODE_ENV,
    maxBreadcrumbs: 50,
    attachStacktrace: true
  })
  Sentry.setTag('service', 'next-sentry')
  return Sentry
}

export function captureException(err: any, ctx?: any, errorInfo?: any) {
  Sentry.configureScope(scope => {
    if (err.message) {
      scope.setFingerprint([err.message])
    }
    const statusCode = err.statusCode || (err.response && err.response.status)
    if (statusCode) {
      scope.setExtra('statusCode', statusCode)
    }
    if (ctx) {
      const { req, res, query, pathname } = ctx
      if (res && res.statusCode) {
        scope.setExtra('statusCode', res.statusCode)
      }
      if (typeof window !== 'undefined') {
        scope.setTag('ssr', false.toString())
        scope.setExtra('query', query)
        scope.setExtra('pathname', pathname)
      } else {
        scope.setTag('ssr', true.toString())
        scope.setExtra('url', req.url)
        scope.setExtra('method', req.method)
        scope.setExtra('headers', req.headers)
        scope.setExtra('params', req.params)
        scope.setExtra('query', req.query)
      }
    }
    if (errorInfo) {
      Object.keys(errorInfo).forEach(key =>
        scope.setExtra(key, errorInfo[key])
      )
    }
  })
  return Sentry.captureException(err)
}
