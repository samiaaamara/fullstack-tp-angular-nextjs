# Full Stack TP — Angular & Next.js

Ce dépôt contient deux applications web développées dans le cadre du TP Full Stack.

## Structure du projet

```text
fullstack-tp/
├── ngapp/          # Application Angular
├── nxapp/          # Application Next.js
├── screenshots/    # Captures d’écran du TP
├── .gitignore
└── README.md
```

## 1. Prérequis

- Node.js et npm
- Docker Desktop
- Git

## 2. Lancer Angular en développement

```powershell
cd ngapp
npm install
npm start
```

Ouvrir : http://localhost:4200

Construire l’application :

```powershell
npm run build
```

## 3. Lancer Next.js en développement

```powershell
cd nxapp
npm install
npm run dev
```

Ouvrir : http://localhost:3000

Construire et lancer en mode production :

```powershell
npm run build
npm run start
```

## 4. Construire les images Docker

Depuis la racine du dépôt :

```powershell
docker build -t ngapp-image ./ngapp
docker build -t nxapp-image ./nxapp
```

## 5. Lancer les conteneurs localement

Application Angular :

```powershell
docker run -d --name ngapp-container -p 8080:80 ngapp-image
```

Application Next.js :

```powershell
docker run -d --name nxapp-container -p 3001:3000 nxapp-image
```

Adresses :

- Angular : http://localhost:8080
- Next.js : http://localhost:3001

Pour vérifier les conteneurs :

```powershell
docker ps
```

Pour arrêter les conteneurs :

```powershell
docker stop ngapp-container nxapp-container
```

## 6. Publier les images sur Docker Hub

Les images sont publiées sur le compte Docker Hub samiaaamara.

```powershell
docker login

docker build -t samiaaamara/ngapp:latest ./ngapp
docker build -t samiaaamara/nxapp:latest ./nxapp

docker push samiaaamara/ngapp:latest
docker push samiaaamara/nxapp:latest
```

Les dépôts Docker Hub doivent être publics pour permettre le téléchargement des images.

## 7. Fonctionnalités principales

### Angular

- Catalogue de produits alimenté par l’API DummyJSON
- Pagination
- Détail des produits
- Formulaire de contact avec validation
- Communication parent-enfant avec `@Input` et `@Output`
- Liste de favoris

### Next.js

- Catalogue de produits avec l’API DummyJSON
- Pagination par paramètre d’URL
- Pages dynamiques de détail des produits
- Pages de chargement, d’erreur et 404
- Communication parent-enfant avec les props et `useState`

## 8. Captures d’écran

Les captures d’écran sont disponibles dans le dossier `screenshots/`.

- `angular-list.png` : liste des produits Angular
- `angular-detail.png` : détail d’un produit Angular
- `nextjs-list.png` : liste des produits Next.js
- `nextjs-detail.png` : détail d’un produit Next.js

## 9. Docker Hub

- Image Angular : `samiaaamara/ngapp:latest`
- Image Next.js : `samiaaamara/nxapp:latest`


