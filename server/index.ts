import Express from 'express'
import Next from 'next'
import sentryInit from '../utils/sentry'
import conf from '../next.config'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev, conf })
const server = Express()
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const Sentry = sentryInit(app.buildId)
  server.use(Sentry.Handlers.requestHandler())

  server.get('/a', (req, res, next) => {
    if (req.query?.addError) {
      throw new Error(`/a: yagisuke's error.`)
    }
    next()
  })

  server.get('/b', (req, res, next) => {
    if (req.query?.addError) {
      try {
        throw new Error('this is an error.')
      } catch (err) {
        Sentry.configureScope((scope) => {
          scope.setFingerprint([`sampleFingerprint`])
          scope.setExtra('sampleExtra', 'sampleExtra')
          scope.setTag('sampleTag', 'sampleTag')
        })
        Sentry.setUser({
          id: '1',
          username: 'sample user',
        })
        Sentry.captureException(err)
      }
    }
    next()
  })

  server.use(Sentry.Handlers.errorHandler())

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
