import getHttpServer from './server'
import { createAndConnectToServer } from "./db"
import http from "http"

const startServer = async () => {
    await createAndConnectToServer()
    const server = getHttpServer()
    server.listen(4000, '0.0.0.0', () => {
        console.log('now running on 4000')
    })
}

startServer()