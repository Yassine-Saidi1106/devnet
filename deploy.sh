#!/bin/bash
docker compose down
docker compose build
docker compose up -d
echo "✅ Application lancée sur http://localhost"