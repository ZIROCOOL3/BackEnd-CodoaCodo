import { connection } from '../db/mysql.connection.js'
import { helpers } from './turnos.helpers.js'


const table = 'Turnos'


const addTurno = async(turno) =>{
    console.log(turno);
    const {nombre, apellido,edad,email,dni,sexo,fecha,hora,fkOdontologo } = turno
    console.log(fecha)
    const query1 = `SELECT id FROM Pacientes WHERE Dni =?`
    const [result1] = await connection.promise().query(query1, [dni])
    const iSex = sexo === 'Masculino' ? 1 : 2;

    if (result1.length > 0) {
        //paciente existe
        //inserto turno
        const foundId = result1[0].id;
        const query = `INSERT INTO ${table} (FkPaciente,FkOdontologo,Fecha,Hora)  VALUES (?,?,?,?)`
        const [result] = await connection.promise().query(query, [foundId, fkOdontologo,fecha,hora])
        return helpers.isSuccessfulOperation(result)
    }
    else{
        //creo paciente
        const query = `INSERT INTO Pacientes (nombre,Apellido,Edad,Email,Dni,FkSexo) VALUES (?,?,?,?,?,?)`
        const [result] = await connection.promise().query(query, [nombre, apellido,edad,email,dni,iSex])
        const newId = result.insertId;
        //inserto el turno
        const query2 = `INSERT INTO ${table} (FkPaciente,FkOdontologo,Fecha,Hora) VALUES (?,?,?,?)`
        const [result2] = await connection.promise().query(query2, [newId, fkOdontologo,fecha,hora])
        console.log(result2)
        return helpers.isSuccessfulOperation(result)
    }

}
const  getTurnosDisponibles= async (fecha)=> {
    try {
        const query = `SELECT horas_disponibles.Hora
                        FROM Odontologos o
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
        const [result] = await connection.promise().query(query)
        return result
    }

    catch (err) {
        console.log('Problemas al obtener los turnos')
        console.log(err)
        return []
    }
}

const updateUser = async (id, { name, age }) => {
    const query = `UPDATE ${table} SET name = '${name}', age = ${age} WHERE id = ${id}`
    const [result] = await connection.promise().query(query)
    return helpers.isSuccessfulOperation(result)
}



const  modifyTurno= async(id, fecha, hora)=> {
    const query = `UPDATE ${table} SET fecha = ?, hora = ? WHERE id = ?`
    const [result] = await connection.promise().query(query, [fecha, hora, id])
    return helpers.isSuccessfulOperation(result)
}

const  deleteTurno= async(id)=> {
    const query = `DELETE FROM ${table} WHERE id = ${id}`
    const [result] = await connection.promise().query(query)
    return helpers.isSuccessfulOperation(result)
}


export const db = {
    getTurnosDisponibles,
    addTurno,
    modifyTurno,
    deleteTurno
}