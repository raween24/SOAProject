package com.info.router;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/api") // tous les endpoints commencent par /api
public class RestApplication extends Application {
    // rien à ajouter ici
}
