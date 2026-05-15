@echo off
REM Pizza Project Frontend - Быстрые команды для Windows

setlocal enabledelayedexpansion

if "%1"=="" (
  call :help
  exit /b
)

if "%1"=="dev" (
  echo.🚀 Запуск сервера разработки...
  call npm run dev
  exit /b
)

if "%1"=="build" (
  echo.📦 Сборка для production...
  call npm run build
  exit /b
)

if "%1"=="preview" (
  echo.👁️  Предпросмотр production сборки...
  call npm run preview
  exit /b
)

if "%1"=="install" (
  echo.📥 Установка зависимостей...
  call npm install
  exit /b
)

if "%1"=="update" (
  echo.⬆️  Обновление зависимостей...
  call npm update
  exit /b
)

if "%1"=="audit" (
  echo.🔍 Проверка безопасности зависимостей...
  call npm audit
  exit /b
)

if "%1"=="fix" (
  echo.🔧 Исправление уязвимостей...
  call npm audit fix
  exit /b
)

if "%1"=="help" (
  call :help
  exit /b
)

echo.Неизвестная команда: %1
call :help
exit /b

:help
echo.Pizza Project Frontend - Команды
echo.
echo.dev       - Запуск сервера разработки (http://localhost:3000^)
echo.build     - Сборка для production
echo.preview   - Предпросмотр production сборки
echo.install   - Установка зависимостей
echo.update    - Обновление зависимостей
echo.audit     - Проверка безопасности
echo.fix       - Исправление уязвимостей
echo.help      - Показать эту справку
echo.
echo.Использование: commands.bat [команда]
echo.
echo.Примеры:
echo.  commands.bat dev       REM Запустить dev сервер
echo.  commands.bat build     REM Собрать для production
exit /b
