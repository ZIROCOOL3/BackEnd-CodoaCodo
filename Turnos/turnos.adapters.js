import Turno from '../models/Turno.js'

const parseTurno = (data) => {
  const turno = new Turno({ ...data,  fkOdontologo: parseInt(data.fkOdontologo) })
  return turno
}

export const adapters = {
  parseTurno,
}
