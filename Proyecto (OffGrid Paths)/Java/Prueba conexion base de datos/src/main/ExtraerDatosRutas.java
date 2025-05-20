package main;

import java.io.*;
import java.sql.*;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author hector
 */
public class ExtraerDatosRutas {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        System.out.println("Se va a extraer la dificultad, la descripcion, la distancia y el ID en un archivo en formato JSON en la ruta ..\\Proyecto (OffGrid Paths)\\Java\\Prueba conexion base de datos");
        //Datos para poder realizar la conexión con la base de datos.
        String url = "jdbc:oracle:thin:@//localhost:1521/XE"; // Reemplaza con tu URL
        String usuario = "SYSTEM"; // Reemplaza con tu usuario
        String contrasena = "DAM6J";
        //Si el archivo no existe lo crea y ejecuta el codigo para extraer los datos
        File file = new File("infoRutas.json");
        try {
            java.sql.Connection conexion = DriverManager.getConnection(url, usuario, contrasena);
            if (file.exists() != true) {
                file.createNewFile();
            }
            
            solicitarDatos(conexion, file);

        } catch (Exception e1) {
            e1.printStackTrace();
        }

    }

    /**
     *
     * @param conexion
     * @param file
     * @throws SQLException
     */
    public static void solicitarDatos(Connection conexion, File file) throws SQLException {
        //Esta es la consulta SQL a ejecutar
        String sql = "SELECT DISTINCT RutaID, Dificultad, Descripcion, Distancia FROM Ruta ORDER BY "
                + "CASE Dificultad "
                + "WHEN 'Facil' THEN 1 "
                + "WHEN 'Intermedia' THEN 2 "
                + "WHEN 'Dificil' THEN 3 "
                + "END";
        //Se guarda la salida de la consulta para trabajar con ella
        PreparedStatement stmt = conexion.prepareStatement(sql);
        ResultSet rs = stmt.executeQuery();
        //Se crea un array para trabajar con JSON
        JSONArray rutasArray = new JSONArray();
        //Este if sirve para comprobar que la consulta no está vacía.
        if (!rs.isBeforeFirst()) {
            System.out.println("La consulta no devolvió resultados.");
        }
        //Este while recorre todas las rutas y las va añadiendo al array
        while (rs.next()) {
            System.out.println("adios");
            JSONObject ruta = new JSONObject();
            ruta.put("RutaID", rs.getInt("RutaID"));
            ruta.put("Dificultad", rs.getString("Dificultad"));
            ruta.put("Descripcion", rs.getString("Descripcion"));
            ruta.put("Distancia", rs.getDouble("Distancia"));
            rutasArray.put(ruta);
            System.out.println("Ruta añadida: " + ruta.toString());
        }
        //Por útltimo escribe en el archivo JSON las rutas
        try (FileWriter writer = new FileWriter(file)) {
            writer.write(rutasArray.toString(4));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
