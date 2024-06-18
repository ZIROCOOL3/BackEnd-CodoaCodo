import TurnosHelpers from '../helpers/Turnos.helpers.js'
import UsersDaoMysql from '../db/daos/turnos.dao.mysql.js'


export default class turnosControllers {

    constructor() {
        this.db = new UsersDaoMysql()
        this.helpers = new TurnosHelpers()
    }

    addTurno = async (req, res) => {
        const turno = this.helpers.crearTurno(req.body)
        const result = await this.db.addTurno(turno)
        res.json(result)
    }
    getTurnos = async (req, res) => {
        const { fecha } = req.body;
        console.log('Fecha recibida:', fecha);
        const users = await this.db.getTurnosDisponibles(fecha)
        res.json(users)
    }


    deleteUser = async (req, res) => {
        const { id } = req.params
        const result = await this.db.deleteUser(id)
        res.json(result)
    }
}