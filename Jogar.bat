@echo off
setlocal

cd /d "%~dp0"

if not exist node_modules (
  echo Instalando dependencias...
  call npm.cmd install
  if errorlevel 1 exit /b 1
)

call npm.cmd run dev
