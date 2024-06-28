use u223632581_codoacodobacke;

DROP TABLE IF EXISTS Sexo;
CREATE TABLE `Sexo` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES Sexo WRITE;
INSERT INTO Sexo VALUES
 (1,'Masculino'),
 (2,'Femenino');
UNLOCK TABLES;

DROP TABLE IF EXISTS Odontologos;
CREATE TABLE `Odontologos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES Odontologos WRITE;
INSERT INTO Odontologos VALUES
 (1,'lopez ','marcos');
UNLOCK TABLES;

DROP TABLE IF EXISTS Pacientes;
CREATE TABLE `Pacientes` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Edad` int(11) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Dni` bigint(20) NOT NULL,
  `FkSexo` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `paciente_sexo_idx` (`FkSexo`),
  CONSTRAINT `paciente_sexo` FOREIGN KEY (`FkSexo`) REFERENCES `Sexo` (`Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES Pacientes WRITE;
INSERT INTO Pacientes VALUES
 (1,'lucas','sotelo',30,'ls@gmail.com',29440629,1),
 (2,'Marta','lopez',40,'marta@gmail.com',36326123,2),
 (3,'lucian','romero',20,'lromero@gmail.com',48152362,2),
 (4,'sebastian','katz',36,'seba@gmail.com',3245612,1);
UNLOCK TABLES;

DROP TABLE IF EXISTS Turnos;
CREATE TABLE `Turnos` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `FkPaciente` int(11) NOT NULL,
  `FkOdontologo` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IdPaciente` (`FkPaciente`),
  KEY `IdOdontologo` (`FkOdontologo`),
  CONSTRAINT `Odo_Turnos_ibfk_1` FOREIGN KEY (`FkPaciente`) REFERENCES `Pacientes` (`Id`),
  CONSTRAINT `Odo_Turnos_ibfk_2` FOREIGN KEY (`FkOdontologo`) REFERENCES `Odontologos` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES Turnos WRITE;
INSERT INTO Turnos VALUES
 (1,1,1,'2024-06-15','17:30:00');
UNLOCK TABLES;

