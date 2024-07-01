import { Router } from 'express'
import { controllers } from '../Turnos/turnos.controllers.js'


const router = Router()

router
    .get('/', controllers.getTurnosDisponibles)
    .post('/', controllers.addTurno)
    .put('/:id', controllers.modifyTurno)
    .delete('/:id', controllers.deleteTurno)

export default router
