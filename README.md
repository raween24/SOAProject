SOAProject/
│
├─ tp333/              # Backend Java (Tomcat / JAX-RS)
│   ├─ src/            # Code source Java
│   ├─ WebContent/     # Fichiers web pour déploiement
│   └─ ...
│
├─ react/              # Frontend React
│   ├─ src/            # Code source React
│   ├─ public/         # Fichiers publics
│   └─ package.json
│
└─ README.md           # Ce fichier

## Fonctionnalités
- Ajouter un utilisateur (nom + âge)
- Modifier un utilisateur
- Supprimer un utilisateur
- Afficher la liste des utilisateurs
- Interface responsive et moderne avec animations

##  Installation et lancement

### 1️⃣ Lancer le backend (TP333)

1. Ouvrir **Eclipse** et charger le projet `tp333`.
2. Vérifier le serveur **Tomcat** dans l’onglet **Servers**.
3. Si le serveur est **STOPPED**, clic droit → **Start**.
4. Ajouter le projet `tp333` au serveur si ce n’est pas déjà fait :  
   `Right click on Tomcat > Add and Remove… > Add TP333 > Finish`.
5. Vérifier que le backend est accessible :  


### Frontend (React)
1. Aller dans le dossier `react-app`.
2. Installer les dépendances :
```bash
npm run dev
