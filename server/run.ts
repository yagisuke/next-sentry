import * as Express from 'express'
import * as http from 'http'
import { createTerminus } from '@godaddy/terminus'

const port = parseInt(process.env.PORT || '3000', 10)

const HOST = '0.0.0.0'
// Specifies the max length of the queue of pending connections
const BACKLOG = 551

export default (app: Express.Application) => {
  function beforeShutdown() {
    return new Promise((resolve) => {
      console.log('call beforeShutdown. start shutdown after 5 seconds...')
      setTimeout(resolve, 5000)
    })
  }

  function onSignal() {
    console.log('call onSiganl. start clean up process ...')
    return Promise.all([
      // @ts-ignore:
      redisStore.client.quit(),
    ])
  }

  const server = http.createServer(app)

  createTerminus(server, {
    beforeShutdown,
    onSignal,
    logger: console.log,
  })

  server.listen(port, HOST, BACKLOG, function () {
    console.log(`Server is started! Running on http://${HOST}:${PORT}`)
  })
}
