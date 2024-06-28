import Mysql from '../connections/Mysql.js';


export default class TurnoDaoMysql extends Mysql {

    constructor() {
        super()
        this.table = 'Turnos'
    }
    
    async addTurno(turno) {
        const {nombre, apellido,edad,email,dni,sexo,fecha,hora,fkOdontologo } = turno
        const query1 = `SELECT id FROM Pacientes WHERE Dni =?`
        const [result1] = await this.connection.promise().query(query1, [dni])
        const iSex = sexo === 'Masculino' ? 1 : 2;

        if (result1.length > 0) {
            //paciente existe
            //inserto turno
            const foundId = result1[0].id;
            const query = `INSERT INTO ${this.table} (FkPaciente,FkOdontologo,Fecha,Hora)  VALUES (?,?,?,?)`
            const [result] = await this.connection.promise().query(query, [foundId, fkOdontologo,fecha,hora])
            return result
        }
        else{
            //creo paciente
            const query = `INSERT INTO Pacientes (nombre,Apellido,Edad,Email,Dni,FkSexo) VALUES (?,?,?,?,?,?)`
            const [result] = await this.connection.promise().query(query, [nombre, apellido,edad,email,dni,iSex])
            const newId = result.insertId;
            //inserto el turno
            const query2 = `INSERT INTO ${this.table} (FkPaciente,FkOdontologo,Fecha,Hora) VALUES (?,?,?,?)`
            const [result2] = await this.connection.promise().query(query2, [newId, fkOdontologo,fecha,hora])
            console.log(result2)
            return result2
        }
        

       /*  const query = `INSERT INTO ${this.table} VALUES (?,?,?,?,?,?,?,?,?,?)`
        const [result] = await this.connection.promise().query(query, [id, nombre, apellido,edad,email,obraSocial,sexo,fecha,hora,fkOdontologo])
        return result */
    }
  
    
    async getTurnosDisponibles(fecha) {
        try {
            const query = `SELECT horas_disponibles.Hora
                            FROM ${this.table} o
                            CROSS JOIN (
                                SELECT DATE_FORMAT('${fecha}', '%Y-%m-%d') AS Fecha 
                            
                            ) AS fechas_disponibles
                            CROSS JOIN (
                                SELECT '08:00:00' AS Hora
                                UNION ALL SELECT '08:30:00'
                                UNION ALL SELECT '09:00:00'
                                UNION ALL SELECT '09:30:00'
                                UNION ALL SELECT '10:00:00'
                                UNION ALL SELECT '10:30:00'
                                UNION ALL SELECT '11:00:00'
                                UNION ALL SELECT '11:30:00'
                                UNION ALL SELECT '16:00:00'
                                UNION ALL SELECT '16:30:00'
                                UNION ALL SELECT '17:00:00'
                                UNION ALL SELECT '17:30:00'
                                UNION ALL SELECT '18:00:00'
                                UNION ALL SELECT '18:30:00'
                                UNION ALL SELECT '19:00:00'
                                UNION ALL SELECT '19:30:00'
                            ) AS horas_disponibles
                            LEFT JOIN Turnos t ON o.Id= t.FkOdontologo AND fechas_disponibles.Fecha = t.Fecha AND horas_disponibles.Hora = t.Hora
                            WHERE t.FkOdontologo IS NULL
                            ORDER BY o.Id, fechas_disponibles.Fecha, horas_disponibles.Hora;`
            const [result] = await this.connection.promise().query(query)
            return result
        }

        catch (err) {
            console.log('Problemas al obtener los turnos')
            return []
        }
    }

    async deleteUser(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ${id}`
        const [result] = await this.connection.promise().query(query)
        return result
    }
}