# Étape 1 : build Astro en image node
FROM node:20-alpine AS builder

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers et build le site
COPY . .
RUN npm run build

# Étape 2 : image finale minimale avec Nginx
FROM nginx:alpine

# Copier les fichiers Astro statiques vers Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Supprimer la configuration par défaut et en créer une propre
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Exposer le port standard web
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]