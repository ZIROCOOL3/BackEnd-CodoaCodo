import express from 'express'
import TurnosRoutes from '../routes/turno.routes.js'

export default class Server {

    static app = express()


    static middlewares() {
        Server.app.use(express.json())
        Server.app.use(express.urlencoded({ extended: true }))
    }


    static routes() {
        const turnosRoutes = new TurnosRoutes()
        Server.app.use('/turnos', turnosRoutes.router)
    }


    static runServer(port) {
        Server.app.listen(port, () =>
            console.log(`listen at http://localhost:${port}`))
    }


    static run(port) {
        console.clear()
        Server.middlewares()
        Server.routes()
        Server.runServer(port)
    }
}