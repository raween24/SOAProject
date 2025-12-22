package com.info.router;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.info.model.Person;
import com.info.service.PersonServiceImpl;

@Path("/users")
public class RestRouter {

    PersonServiceImpl ps = new PersonServiceImpl();

    // GET : afficher tous les utilisateurs
    @GET
    @Path("/affiche")
    @Produces(MediaType.APPLICATION_JSON)
    public Person[] getAllUsers() {
        return ps.getAllPersons();
    }

    // PUT : ajouter un utilisateur
    @PUT
    @Path("/add/{age}/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> addUser(@PathParam("age") int age,
                                       @PathParam("name") String name) {

        Map<String, Object> response = new HashMap<>();

        Person user = new Person();
        user.setAge(age);       
        user.setName(name);     

        ps.addPerson(user);

        response.put("state", "ok");
        response.put("user", user);
        return response;
    }

    // PUT : mettre à jour un utilisateur
    // URL : /api/users/update/{id}/{age}/{name}
    @PUT
    @Path("/update/{id}/{age}/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> updateUser(@PathParam("id") int id,
                                          @PathParam("age") int age,
                                          @PathParam("name") String name) {

        Map<String, Object> response = new HashMap<>();

        Person user = ps.getPerson(id);  // récupérer l'utilisateur existant
        if (user == null) {
            response.put("state", "ko");
            response.put("msg", "id doesn't exist");
            return response;
        }

        user.setAge(age);
        user.setName(name);

        boolean ok = ps.updatePerson(user);  // il faut créer cette méthode dans PersonServiceImpl

        response.put("state", ok ? "ok" : "ko");
        response.put("user", user);
        return response;
    }

    // DELETE : supprimer un utilisateur par id
    @DELETE
    @Path("/remove/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> deleteUser(@PathParam("id") int id) {
        Map<String, Object> response = new HashMap<>();

        try {
            boolean ok = ps.deletePerson(id);
            if (ok) {
                response.put("state", "ok");
            } else {
                response.put("state", "ko");
                response.put("msg", "id doesn't exist");
            }
        } catch (Exception e) {
            response.put("state", "no");
            response.put("msg", e.getMessage());
        }

        return response;
    }
}
