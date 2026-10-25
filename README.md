# Full Stack TP — Angular, Next.js et API REST

## Présentation du projet

Ce projet est réalisé dans le cadre du TP Full Stack. Il comprend deux applications web, une API REST et une base de données relationnelle.

### Technologies utilisées

- **Frontend 1 :** Angular
- **Frontend 2 :** Next.js
- **Backend :** Node.js, Express et TypeScript
- **Base de données :** PostgreSQL
- **ORM :** Prisma
- **Validation des données :** Zod
- **Conteneurisation :** Docker et Docker Compose

## Architecture du projet

```text
fullstack-tp/
├── api/
│   ├── prisma/
│   ├── src/
│   ├── Dockerfile
│   ├── requests.http
│   └── package.json
├── ngapp/
├── nxapp/
├── screenshots/
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Prérequis

- Node.js et npm pour le développement local
- Docker Desktop
- Git
- Visual Studio Code, avec une extension REST Client pour exécuter les requêtes HTTP (facultatif)

## Lancer les applications avec Docker Compose

Depuis la racine du projet :

```bash
docker compose up -d --build
```

Les images Docker des interfaces Angular et Next.js doivent être disponibles sous les noms `ngapp-image:latest` et `nxapp-image:latest`, conformément au fichier Docker Compose.

Pour vérifier l'état des services :

```bash
docker compose ps
```

Pour consulter les journaux :

```bash
docker compose logs -f
```

Pour arrêter les services :

```bash
docker compose down
```

### Adresses des services

| Service | Adresse |
|---|---|
| Application Angular | http://localhost:4200 |
| Application Next.js | http://localhost:3000 |
| API Express | http://localhost:4000 |
| API produits | http://localhost:4000/api/products |
| API catégories | http://localhost:4000/api/categories |
| PostgreSQL | localhost:5432 |

PostgreSQL est accessible depuis l'hôte sur le port 5432. Les applications et l'API communiquent dans le réseau Docker lorsque cela est nécessaire.

## Développement local

### Angular

```bash
cd ngapp
npm install
npm start
```

Application : http://localhost:4200

Pour compiler l'application :

```bash
npm run build
```

### Next.js

```bash
cd nxapp
npm install
npm run dev
```

Application : http://localhost:3000

Pour compiler l'application :

```bash
npm run build
```

Pour démarrer la version compilée :

```bash
npm run start
```

### API Express

```bash
cd api
npm install
npm run dev
```

API : http://localhost:4000

Pour compiler le backend TypeScript :

```bash
npm run build
```

Pour démarrer la version compilée :

```bash
npm start
```

Le démarrage local de l'API nécessite une configuration de base de données adaptée dans l'environnement. Ne publiez pas le fichier `.env` ni ses secrets.

## Fonctionnalités de l'API REST

### Produits

| Méthode | Route | Fonction |
|---|---|---|
| GET | `/api/products` | Lister les produits |
| GET | `/api/products/:id` | Consulter un produit |
| POST | `/api/products` | Créer un produit |
| PUT | `/api/products/:id` | Modifier un produit |
| DELETE | `/api/products/:id` | Supprimer un produit |

### Recherche, filtrage et pagination

Exemples de requêtes :

```http
GET /api/products?limit=5&skip=0
GET /api/products?limit=5&skip=5
GET /api/products?search=lipstick
GET /api/products?categoryId=1
GET /api/products?search=red&limit=2&skip=0
```

La liste des produits renvoie notamment les propriétés `data`, `total`, `limit` et `skip`.

### Catégories

```http
GET /api/categories
```

La route permet de récupérer les catégories et le nombre de produits associés à chacune.

### Validation et gestion des erreurs

Zod valide les données reçues lors de la création et de la modification des produits. Une requête invalide, par exemple avec un prix négatif, renvoie une erreur HTTP 400.

L'API renvoie également une erreur HTTP 404 lorsqu'un produit demandé n'existe pas.

## Tests de l'API

Le fichier `api/requests.http` contient les requêtes HTTP utilisées pour tester les fonctionnalités de l'API.

Les tests réalisés comprennent :

- La récupération des produits
- La pagination
- La recherche par mot-clé
- Le filtrage par catégorie
- La récupération des catégories
- La création d'un produit
- La validation des données avec Zod
- La modification d'un produit
- La suppression d'un produit
- La vérification d'une ressource inexistante

Les routes de création, de modification et de suppression ont été testées avec succès sur un produit de test.

## Docker

Le fichier `docker-compose.yml` définit quatre services :

- `ngapp` : application Angular
- `nxapp` : application Next.js
- `api` : serveur Express
- `db` : base de données PostgreSQL 17

La base de données utilise un volume Docker nommé `pgdata` afin de conserver ses données au-delà de l'arrêt des conteneurs.

Commandes utiles :

```bash
docker compose ps
docker compose logs api
docker compose logs db
docker compose restart api
docker compose down
```

Attention : la commande `docker compose down -v` supprime également les volumes déclarés et peut entraîner la perte des données PostgreSQL.

## Captures d'écran

Le dossier `screenshots/` est prévu pour conserver les captures d'écran des interfaces et des tests.

Ajoutez les captures réellement disponibles, par exemple :

- `angular-list.png`
- `angular-detail.png`
- `nextjs-list.png`
- `nextjs-detail.png`

Adaptez cette liste aux fichiers présents dans le dossier.

## Sécurité et configuration

- Ne versionnez pas les fichiers `.env` contenant des secrets.
- En production, utilisez des mots de passe et des variables d'environnement sécurisés.
- Évitez d'exposer directement le port PostgreSQL sur un réseau public.
- Les identifiants définis dans le fichier Docker Compose sont destinés au laboratoire local et doivent être remplacés pour un déploiement réel.

## Auteur

Projet réalisé dans le cadre du TP Full Stack.
