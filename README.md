##### SOA Project - Gestion Utilisateurs

Un projet SOA complet avec backend Java (Tomcat/JAX-RS) et frontend React pour la gestion des utilisateurs.

##### Demo Video  #####
Google Drive:
https://drive.google.com/file/d/1dZ1SOeo5qEGNJ5dbCHrSu36Mv7RX0PeD/view?usp=sharing

### Fonctionnalités ###
## Gestion des Utilisateurs
- **Ajouter un utilisateur** (nom + âge)
- **Modifier un utilisateur** existant
- **Supprimer un utilisateur**
- **Afficher la liste** des utilisateurs
- **Recherche et filtrage** des utilisateurs

### Interface ###
- **Design responsive** (mobile, tablette, desktop)
- **Animations modernes** et transitions fluides
- **UI/UX intuitive** et conviviale
- **Validation en temps réel** des formulaires


#### 1️⃣ **Cloner le projet**
bash
git clone [votre-repo-url]
cd SOAProject

#### 2️⃣ **Lancer le Backend (TP333)**
# Méthode 1 : Avec Eclipse
1. Ouvrir Eclipse
2. File > Import > Existing Projects into Workspace
3. Sélectionner le dossier "tp333"
4. Clic droit sur tp333 > Run As > Run on Server
5. Choisir Tomcat et démarrer

# Méthode 2 : Avec Maven en ligne de commande
cd tp333
mvn clean install
mvn tomcat7:deploy  # ou déployer manuellement le fichier .war dans Tomcat

# Vérifier que le backend fonctionne
curl http://localhost:8080/tp333/api/users
# Doit retourner : {"message": "Backend SOA démarré avec succès!"}

### 3️⃣Lancer le Frontend (React)
# Aller dans le dossier React
cd react

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

### 4️⃣Accéder à l'application
Backend API : http://localhost:8080/tp333/

Frontend : http://localhost:3000

Interface utilisateur : http://localhost:3000 (avec connexion automatique au backend)
