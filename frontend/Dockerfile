# Étape 1: Build Angular
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --force

COPY . .

# Build - adaptez selon votre version Angular
RUN npm run build --prod

# Étape 2: Nginx
FROM nginx:alpine

# Copier les fichiers Angular buildés (essayez les deux chemins)
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html
# Si ça ne marche pas, décommentez la ligne ci-dessous et commentez celle du dessus
# COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copier une configuration Nginx personnalisée
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend:4000/; \
        proxy_set_header Host $host; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80