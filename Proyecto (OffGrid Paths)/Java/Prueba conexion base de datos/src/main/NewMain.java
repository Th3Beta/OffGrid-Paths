package main;

import java.io.*;

/**
 *
 * @author hector
 */
public class NewMain {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        File file = new File("infoRutas.json");
        try {
            if (file.exists() != true) {
                file.createNewFile();
            }
        } catch (Exception e1) {
            System.out.println(e1.getStackTrace());
        }
        
    }

}
