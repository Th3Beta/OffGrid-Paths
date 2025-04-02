CREATE DATABASE OffGridPaths;
USE OffGridPaths;

CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Montaña (
    MontañaID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Altura DECIMAL(7,2) NOT NULL,
    Ubicacion VARCHAR(100) NOT NULL,
    Descripcion TEXT NOT NULL,
    Imagen VARCHAR(255) NOT NULL
);

CREATE TABLE Ruta (
    RutaID INT PRIMARY KEY AUTO_INCREMENT,
    MontañaID INT NOT NULL,
    Dificultad ENUM('Fácil', 'Intermedia', 'Difícil') NOT NULL,
    Descripcion TEXT NOT NULL,
    Duracion TIME NOT NULL,
    Distancia DECIMAL(7,2) NOT NULL,
    FOREIGN KEY (MontañaID) REFERENCES Montaña(MontañaID) ON DELETE CASCADE
);

CREATE TABLE Material (
    MaterialID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion TEXT NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad >= 0)
);

CREATE TABLE RutaMaterial (
    RutaID INT,
    MaterialID INT,
    PRIMARY KEY (RutaID, MaterialID),
    FOREIGN KEY (RutaID) REFERENCES Ruta(RutaID) ON DELETE CASCADE,
    FOREIGN KEY (MaterialID) REFERENCES Material(MaterialID) ON DELETE CASCADE
);


