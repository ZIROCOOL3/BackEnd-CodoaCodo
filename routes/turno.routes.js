import Routes from "./routes.js";
import TurnosControllers from "../controllers/turnos.controllers.js";

export default class UsersRoutes extends Routes {

    constructor() {
        super()
        this.controller = new TurnosControllers()
        this.getRoutes()
    }

    getRoutes() {
        this.router
            .post('/', this.controller.addTurno)
            .get('/', this.controller.getTurnos)
            .delete('/:id', this.controller.deleteTurno)
            .put('/', this.controller.modifyTurno)
/*          .get('/turno', this.controller.getUsersByName)
            .get('/:id', this.controller.getUserById)
 */    }
}
