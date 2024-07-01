export default class Turno {

    constructor(turno) {
        const {id, nombre, apellido,edad,email,dni,sexo,fecha,hora,fkOdontologo} = turno
        this.id = id
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.email = email
        this.dni = dni
        this.sexo = sexo
        this.fecha = fecha
        this.hora = hora
        this.fkOdontologo = fkOdontologo
    }
}