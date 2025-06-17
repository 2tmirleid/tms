# 🚀 TMS — Test Management System

Система управления тестированием с фронтендом на Vue + Vite и backend-частью на Java + Spring Boot. Контейнеризировано с
помощью Docker.

---

## 📦 Состав проекта

| Сервис     | Стек                         | Назначение                 |
|------------|------------------------------|----------------------------|
| `client`   | Vue 3, Vite, npm             | Пользовательский интерфейс |
| `api`      | Java 21, Spring Boot, Gradle | REST API и бизнес-логика   |
| `postgres` | PostgreSQL 12                | СУБД                       |

---

## ⚙️ Сборка и запуск

```bash
# Сборка контейнеров
docker-compose build

# Запуск (в фоне или нет)
docker-compose up
# или
docker-compose up -d
