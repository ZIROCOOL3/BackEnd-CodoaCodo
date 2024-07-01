import { db } from "./turnos.dao.mysql.js"
import { adapters } from './turnos.adapters.js'


const addTurno = async (req, res) => {
    const turno =  adapters.parseTurno(req.body)
    const result = await db.addTurno(turno)
    res.json(result)
}

const getTurnosDisponibles = async (req, res) => {
    const { fecha } = req.body;
    const turno = await db.getTurnosDisponibles(fecha)
    res.json(turno)
}

const deleteTurno = async (req, res) => {
    const { id } = req.params
     const result = await db.deleteTurno(id)
     res.json(result)
}
const modifyTurno = async (req, res, next) => {
    const { id } = req.params
    const { fecha, hora  } = req.body;
    const result = await db.modifyTurno(id, fecha, hora)
    res.json(result)
}

/* const modifyTurno = async (req, res) => {
    const {  id, fecha, hora  } = req.body;
    ///const turno = adapters.parseUser(req.body)
    const result = await db.modifyTurno(id, fecha, hora)
    res.json(result)
} */


export const controllers = {
    getTurnosDisponibles,
    addTurno,
    modifyTurno,
    deleteTurno
}