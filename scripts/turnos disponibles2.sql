SELECT fechas_disponibles.Fecha, horas_disponibles.Hora
FROM Odontologos o
CROSS JOIN (
    SELECT DATE_FORMAT('2024-06-16', '%Y-%m-%d') AS Fecha -- Cambia '2024-04-10' por la fecha deseada
  
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
ORDER BY o.Id, fechas_disponibles.Fecha, horas_disponibles.Hora;
