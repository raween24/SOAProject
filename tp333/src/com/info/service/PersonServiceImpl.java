package com.info.service;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.jws.WebService;

import com.info.db.ConnexionDB;
import com.info.model.Person;

@WebService(endpointInterface = "com.info.service.PersonService")
public class PersonServiceImpl implements PersonService {

    Connection cn = ConnexionDB.getConnexion();

    @Override
    public boolean addPerson(Person p) {
        String sql = "INSERT INTO `person` (`Name`, `Age`) VALUES ('" + p.getName() + "'," + p.getAge() + ")";
        try (Statement st = cn.createStatement()) {
            int rows = st.executeUpdate(sql);
            return rows > 0;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deletePerson(int id) {
        String sql = "DELETE FROM `person` WHERE id=" + id;
        try (Statement st = cn.createStatement()) {
            int rows = st.executeUpdate(sql);
            return rows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Person getPerson(int id) {
        Person person = null;
        String sql = "SELECT `ID`, `Name`, `Age` FROM `person` WHERE id=" + id;

        try (Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            if (rs.next()) {
                person = new Person();
                person.setId(rs.getInt("id"));
                person.setName(rs.getString("Name"));
                person.setAge(rs.getInt("Age"));
            }

            return person;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Person getPersonByName(String name) {
        Person person = null;
        String sql = "SELECT `ID`, `Name`, `Age` FROM `person` WHERE name='" + name + "'";

        try (Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            if (rs.next()) {
                person = new Person();
                person.setId(rs.getInt("id"));
                person.setName(rs.getString("Name"));
                person.setAge(rs.getInt("Age"));
            }

            return person;

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Person[] getAllPersons() {
        List<Person> persons = new ArrayList<>();
        String sql = "SELECT * FROM `person`";

        try (Statement st = cn.createStatement();
             ResultSet rs = st.executeQuery(sql)) {

            while (rs.next()) {
                Person person = new Person();
                person.setId(rs.getInt("id"));
                person.setName(rs.getString("Name"));
                person.setAge(rs.getInt("Age"));
                persons.add(person);
            }

            return persons.toArray(new Person[0]);

        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    // ============================
    // Nouvelle méthode UPDATE
    // ============================
    public boolean updatePerson(Person p) {
        String sql = "UPDATE `person` SET `Name`='" + p.getName() + "', `Age`=" + p.getAge() + 
                     " WHERE id=" + p.getId();

        try (Statement st = cn.createStatement()) {
            int rows = st.executeUpdate(sql);
            return rows > 0; // true si au moins une ligne modifiée
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
