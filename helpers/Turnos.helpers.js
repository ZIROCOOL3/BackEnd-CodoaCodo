import Turno from '../models/Turno.js'

export default class TurnoHelpers {

    crearTurno(newData) {
        const { id, nombre, apellido,edad,email,obraSocial,sexo,fecha,hora,fkOdontologo} = newData
        const turno = new Turno(parseInt(id), nombre,apellido,parseInt(edad),email,obraSocial,sexo,new Date(fecha),hora, parseInt(fkOdontologo))
        return turno
    }
}