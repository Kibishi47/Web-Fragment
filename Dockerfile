# Étape 1 : build Astro
FROM node:20-alpine AS builder

# Répertoire de travail
WORKDIR /app

# Copie des fichiers du projet
COPY . .

# Installation des dépendances
RUN npm ci

# Build du site statique Astro
RUN npm run build

# Étape 2 : image Nginx minimale pour servir le site
FROM nginx:alpine

# Copie des fichiers Astro générés dans le dossier public de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Suppression de la configuration par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port exposé
EXPOSE 80

# Commande de lancement
CMD ["nginx", "-g", "daemon off;"]