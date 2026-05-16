@echo off
echo ========================================
echo   PROJET DEVNET - DEPLOIEMENT AUTO
echo ========================================
echo.

echo [1/5] Verification de Docker...
docker --version > nul 2>&1
if errorlevel 1 (
    echo ERREUR: Docker non installe
    pause
    exit /b 1
)
echo OK

echo [2/5] Nettoyage des anciens conteneurs...
docker compose down -v 2> nul

echo [3/5] Build des images Docker...
docker compose build --no-cache

echo [4/5] Demarrage des conteneurs...
docker compose up -d

echo [5/5] Verification des services...
timeout /t 5 /nobreak > nul

echo.
echo Verification des conteneurs:
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo.
echo ========================================
echo   DEPLOIEMENT TERMINE !
echo ========================================
echo.
echo   Frontend: http://localhost
echo   Backend:  http://localhost:4000
echo   MongoDB:  mongodb://localhost:27017
echo.
echo   Pour voir les logs: docker compose logs -f
echo   Pour arreter:       docker compose down
echo ========================================
pause