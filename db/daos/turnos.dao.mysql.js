import Mysql from '../connections/Mysql.js';


export default class TurnoDaoMysql extends Mysql {

    constructor() {
        super()
        this.table = 'Turnos'
    }
    
    async addTurno(turno) {
        const { id, nombre, apellido,edad,email,obraSocial,sexo,fecha,hora,fkOdontologo } = turno
        const query = `INSERT INTO ${this.table} VALUES (?,?,?,?,?,?,?,?,?,?)`
        const [result] = await this.connection.promise().query(query, [id, nombre, apellido,edad,email,obraSocial,sexo,fecha,hora,fkOdontologo])
        return result
    }
    
    
    async getTurnosDisponibles(fecha) {
        try {
            const query = `SELECT horas_disponibles.Hora
                            FROM ${this.table} o
                            CROSS JOIN (
                                SELECT DATE_FORMAT(?, '%Y-%m-%d') AS Fecha -- Cambia '2024-04-10' por la fecha deseada
                            
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
            const [result] = await this.connection.promise().query(query,[fecha])
            console.log(fecha)
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