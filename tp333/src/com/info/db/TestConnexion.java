package com.info.db;

import java.sql.Connection;

public class TestConnexion {

    public static void main(String[] args) {
        Connection c = ConnexionDB.getConnexion();
        System.out.println(c != null ? "Connexion OK" : "Connexion NULL");
    }
}
