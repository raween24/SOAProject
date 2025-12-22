package com.info.db;

import java.sql.Connection;
import java.sql.DriverManager;

public class ConnexionDB {

    private static final String URL =
        "jdbc:mysql://localhost:3306/tp2db?useSSL=false&serverTimezone=UTC";
    private static final String LOGIN = "root";      // ton user MySQL
    private static final String PASSWORD = "root";   // ton mot de passe MySQL

    private static Connection cn; // l'objet connection

    private ConnexionDB() {
        try {
            Class.forName("com.mysql.jdbc.Driver");   // driver 5.1.48
            cn = DriverManager.getConnection(URL, LOGIN, PASSWORD);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnexion() {
        if (cn == null) {
            new ConnexionDB();
        }
        return cn;
    }
}
