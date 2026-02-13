@echo off
echo Iniciando servidor local para el Portafolio...
echo Abriendo en http://localhost:8000
start http://localhost:8000
cd public
python -m http.server 8000
pause
