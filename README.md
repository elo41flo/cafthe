# Nom du projet

Caf'Thé

Caf'thé est un site e-commerce de vente de café, de thé, d'accessoires, etc.

<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decommenter et adapter les badges selon votre CI/CD -->
<!-- ![Build](https://img.shields.io/github/actions/workflow/status/USER/REPO/ci.yml?branch=main) -->
<!-- ![Tests](https://img.shields.io/github/actions/workflow/status/USER/REPO/tests.yml?branch=main&label=tests) -->
<!-- ![License](https://img.shields.io/github/license/USER/REPO) -->

## Prerequis

- [Node.js](https://nodejs.org/) >= 18
- npm
- Une API back-end fonctionnelle
- Une base de données MySQL fonctionnelle

## Quickstart

```bash
# 1. Cloner le dépôt
git clone https://github.com/eloro41/cafthe-front.git
cd cafthe-front

# 2. Installer les dépendances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Éditer .env et renseigner VITE_API_URL

# 4. Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Variables d'environnement

| Variable       | Description | Exemple |
| -------------- | ----------- | ------- |
| `VITE_API_URL` | URL de      | http:// |
|                | l'API back- | localho |
|                | end         | st:3000 |
| `VITE_...`     |             |         |

## Scripts disponibles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Exemples d'utilisation

<!-- Lister ici les principales routes de votre application avec une courte description -->

/,Accueil avec produits phares

/login / /register Authentification client

/forgot-password, Réinitialisation de mot de passe (via PUT)

/produits, Catalogue complet filtrable

/panier, Gestion du panier avant commande

/aide-contact, Formulaire de contact (via Formspree)

## Structure du projet

```
src/
├── assets/            # Images, logos et icônes
├── components/        # Composants réutilisables (Navbar, Footer, ProductCard)
├── context/           # AuthContext (gestion du token JWT)
├── pages/             # Vues principales (Home, Login, Register, AideContact)
├── styles/            # CSS par page et global
├── App.jsx            # Routage principal
└── main.jsx           # Point d'entrée React
```

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers statiques sont generes dans le dossier `dist/`.

### Hebergement

Frontend : Déployé sur Vercel.

Backend : Hébergé sur [Plesk].

Base de données : Hébergée sur [Plesk].

## Tests

<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decrire comment lancer les tests -->

```bash
# Lancer les tests
npm run test
```

## Stack technique

- React 18 (Vite)

- Node.js (Express) pour l'API

- MySQL pour la gestion des données

- JSON Web Token (JWT) pour la sécurité

- Bcrypt pour le hachage des mots de passe

- Formspree pour la gestion des mails de contact

## Auteurs

- **Eloise Robert** — Créatrice

## Licence

Ce projet est sous licence MIT

## Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vite.dev/)
- [Arborescence Figma](https://www.figma.com/board/VRonxn9PUkzXhCzfqyY9bB/Arborescence-Caf-Th%C3%A9?node-id=0-1&t=Jt3gyAlu5PEREUZF-1)
- [Maquette Figma](https://www.figma.com/design/lq02dKrsqkDfmuxpuaLxpL/Caf-Th%C3%A9-Maquette-HD?node-id=3-237&t=opIh4tYXZT3oRA2K-1)
