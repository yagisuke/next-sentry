import Express from 'express'
import Next from 'next'
import bodyParser from 'body-parser'
import sentryInit from '../utils/sentry'
import conf from '../next.config'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = Next({ dev, conf })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = Express()
  server.use(bodyParser.urlencoded({ extended: true }))
  server.use(bodyParser.json())

  const sentry = sentryInit(app.buildId)
  server.use(sentry.Handlers.requestHandler())

  server.get('/c', () => {
    throw new Error(`/c: yagisuke's error.`)
  })

  server.get('/d', () => {
    try {
      throw new Error(`/b: yagisuke's error.`)
    } catch (err) {
      sentry.configureScope((scope) => {
        scope.setFingerprint([`sampleFingerprint`])
        scope.setExtra('sampleExtra', 'sampleExtra')
        scope.setTag('sampleTag', 'sampleTag')
      })
      sentry.setUser({
        id: '1',
        username: 'sample user',
      })
      sentry.captureException(err)
    }
  })

  server.use(sentry.Handlers.errorHandler())

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
