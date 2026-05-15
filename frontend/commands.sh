#!/bin/bash

# Pizza Project Frontend - Быстрые команды

# Запуск сервера разработки
dev() {
  echo "🚀 Запуск сервера разработки..."
  npm run dev
}

# Сборка для production
build() {
  echo "📦 Сборка для production..."
  npm run build
}

# Предпросмотр production сборки
preview() {
  echo "👁️  Предпросмотр production сборки..."
  npm run preview
}

# Установка зависимостей
install() {
  echo "📥 Установка зависимостей..."
  npm install
}

# Обновление зависимостей
update() {
  echo "⬆️  Обновление зависимостей..."
  npm update
}

# Проверка зависимостей
audit() {
  echo "🔍 Проверка безопасности зависимостей..."
  npm audit
}

# Исправление уязвимостей
fix() {
  echo "🔧 Исправление уязвимостей..."
  npm audit fix
}

# Линтирование кода
lint() {
  echo "📝 Проверка качества кода..."
  npm run lint
}

# Справка
help() {
  echo "Pizza Project Frontend - Команды"
  echo ""
  echo "dev       - Запуск сервера разработки (http://localhost:3000)"
  echo "build     - Сборка для production"
  echo "preview   - Предпросмотр production сборки"
  echo "install   - Установка зависимостей"
  echo "update    - Обновление зависимостей"
  echo "audit     - Проверка безопасности"
  echo "fix       - Исправление уязвимостей"
  echo "lint      - Проверка качества кода"
  echo "help      - Показать эту справку"
}

# Выполнить команду если передана
if [ $# -eq 0 ]; then
  help
else
  "$@"
fi
