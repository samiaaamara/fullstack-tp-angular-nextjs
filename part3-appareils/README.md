# Gestion des appareils

## 1. Présentation
Application web permettant de gérer des appareils et leur état (On / Off).
Les données sont enregistrées dans MongoDB et manipulées via une API REST.

## 2. Technologies utilisées
- Frontend : Angular, TypeScript, Bootstrap
- Backend : Node.js, Express, TypeScript
- Base de données : MongoDB avec Mongoose
- Validation des données : Zod
- Conteneurisation : Docker et Docker Compose
- Serveur frontend : Nginx

## 3. Architecture
- `front/` : application Angular
- `api/` : API REST Express
- `docker-compose.yml` : configuration des trois services
- `mongodb_data` : volume Docker persistant pour les données MongoDB

## 4. Prérequis
- Docker Desktop installé et démarré
- Docker Compose disponible

## 5. Lancer le projet
Depuis la racine du projet :

```powershell
docker compose up --build -d
```

Vérifier l'état des conteneurs :

```powershell
docker compose ps
```

Afficher les journaux :

```powershell
docker compose logs --tail=50
```

## 6. Accès aux services
- Frontend Angular : http://localhost:8080
- API REST : http://localhost:3001
- Vérification de santé : http://localhost:3001/api/health
- MongoDB : localhost:27017

## 7. Principales routes de l'API
| Méthode | Route | Description |
|---|---|---|
| GET | `/api/appareils` | Lister les appareils |
| GET | `/api/appareils/:id` | Consulter un appareil |
| POST | `/api/appareils` | Ajouter un appareil |
| PUT | `/api/appareils/:id` | Modifier un appareil |
| DELETE | `/api/appareils/:id` | Supprimer un appareil |
| PATCH | `/api/appareils/switch-all` | Inverser l'état de tous les appareils |
| GET | `/api/health` | Vérifier l'état de l'API |

Un appareil possède un nom et un état (`On` ou `Off`). Le nom doit contenir entre 2 et 100 caractères.

## 8. Persistance des données
MongoDB utilise le volume Docker nommé `mongodb_data`. Les données sont conservées lorsque les conteneurs sont arrêtés puis redémarrés.

Pour arrêter les services sans supprimer les données :

```powershell
docker compose down
```

Pour redémarrer :

```powershell
docker compose up -d
```

Attention : `docker compose down -v` supprime également le volume de données.

## 9. Tests effectués
- Compilation Angular réussie
- Compilation TypeScript du backend réussie
- Démarrage des trois conteneurs vérifié
- Connexion MongoDB vérifiée
- Création, lecture, modification et suppression testées
- Validation des données invalides : réponse HTTP 400
- Interface Angular accessible sur le port 8080
- Conservation des données vérifiée après redémarrage des conteneurs

