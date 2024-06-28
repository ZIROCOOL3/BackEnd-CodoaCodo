import ModiTurno from '../models/ModiTurno.js'

export default class ModiTurnoHelpers {
    modiTurno(newData) {
        const { id,fecha,hora} = newData
        const moditurno = new ModiTurno(parseInt(id), new Date(fecha),hora)
        return moditurno
    }
}