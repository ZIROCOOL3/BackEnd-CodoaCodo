CREATE TABLE `Odontologos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Pacientes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Edad` int(11) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `FkSexo` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `paciente_sexo_idx` (`FkSexo`),
  CONSTRAINT `paciente_sexo` FOREIGN KEY (`FkSexo`) REFERENCES `Sexo` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `Sexo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Turnos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FkPaciente` int(11) DEFAULT NULL,
  `FkOdontologo` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdPaciente` (`FkPaciente`),
  KEY `IdOdontologo` (`FkOdontologo`),
  CONSTRAINT `Odo_Turnos_ibfk_1` FOREIGN KEY (`FkPaciente`) REFERENCES `Pacientes` (`Id`),
  CONSTRAINT `Odo_Turnos_ibfk_2` FOREIGN KEY (`FkOdontologo`) REFERENCES `Odontologos` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


## tabla tuno unificado
CREATE TABLE `Turnos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Edad` int(11) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `ObraSocial` varchar(100) DEFAULT NULL,
  `Sexo` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
