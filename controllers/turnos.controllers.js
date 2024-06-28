import TurnosHelpers from '../helpers/Turnos.helpers.js'
import ModiTurnosHelpers from '../helpers/ModiTurnos.helpers.js'
import UsersDaoMysql from '../db/daos/turnos.dao.mysql.js'


export default class turnosControllers {

    constructor() {
        this.db = new UsersDaoMysql()
        this.helpers = new TurnosHelpers()
        this.helpersModi = new ModiTurnosHelpers()
    }

    addTurno = async (req, res) => {
        const turno = this.helpers.crearTurno(req.body)
        const result = await this.db.addTurno(turno)
        res.json(result)
    }
    
    getTurnos = async (req, res) => {
        const { fecha } = req.body;
        const turno = await this.db.getTurnosDisponibles(fecha)
        res.json(turno)
    }
    deleteTurno = async (req, res) => {
        const { id } = req.params
         const result = await this.db.deleteTurno(id)
         res.json(result)
    }
    modifyTurno = async (req, res) => {
        const turno = this.helpersModi.modiTurno(req.body)
        const result = await this.db.modifyTurno(turno)
        res.json(result)
    }
}