# Étape 1 : build du site Astro
FROM node:20-alpine AS builder

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le reste du code et construire le site
COPY . .
RUN npm run build

# Étape finale : image minimale contenant uniquement le site généré
FROM alpine:latest

# Installer un outil pour servir statiquement si nécessaire
RUN apk add --no-cache curl

# Copier les fichiers buildés
COPY --from=builder /app/dist /site

# Point d’entrée neutre : c’est Coolify qui sert /site
CMD ["echo", "Build Astro terminé. Les fichiers sont disponibles dans /site"]