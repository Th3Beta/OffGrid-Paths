package main;

import java.sql.*;

/**
 *
 * @author hector
 */
public class PruebaDeInserts {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        String url = "jdbc:oracle:thin:@//localhost:1521/XE"; // Reemplaza con tu URL
        String usuario = "SYSTEM"; // Reemplaza con tu usuario
        String contrasena = "DAM6J"; // Reemplaza con tu contraseña

        try {
            Connection conexion = DriverManager.getConnection(url, usuario, contrasena);
            System.out.println("Conexion exitosa a Oracle!");
            //cargarUser(conexion);
            //cargarMontana(conexion);
            cargarRuta(conexion);
            conexion.close();
        } catch (SQLException e) {
            System.out.println("ERROR en la conexion a la base de datos.");
            e.printStackTrace();
        }
    }
    
    private static void cargarUser(Connection conexion) throws SQLException {
        String sql = "INSERT INTO Users (Username, PasswordHash, Email) VALUES (?, ?, ?)";
        try (PreparedStatement statement = conexion.prepareStatement(sql)) {
            statement.setString(1, "Nombre2");
            statement.setString(2, "contraseña2");
            statement.setString(3, "email2");
            statement.executeUpdate();
        }
    }
    
    private static void cargarMontana(Connection conexion) throws SQLException {
        String sql = "INSERT INTO Montaña (Nombre, Altura, Ubicacion, Descripcion) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = conexion.prepareStatement(sql)) {
            statement.setString(1, "Nombre1");
            statement.setDouble(2, 19000);
            statement.setString(3, "Valencia");
            statement.setString(4, "Descripcion breve");
            statement.executeUpdate();
        }
    }
    
    private static void cargarRuta(Connection conexion) throws SQLException {
        String sql = "INSERT INTO Ruta (MontañaID, Dificultad, Descripcion, Distancia) VALUES (?, ?, ?, ?)";
        try (PreparedStatement statement = conexion.prepareStatement(sql)) {
            statement.setInt(1, 1);
            statement.setString(2, "Difícil");
            statement.setString(3, "Descripción breve");
            statement.setDouble(4, 1200);
            statement.executeUpdate();
        }
    }
}
