# 🚀 TMS — Test Management System

Система управления тестированием с фронтендом на Vue + Vite и backend-частью на NestJS. Контейнеризировано с
помощью Docker.

---

## 📦 Состав проекта

| Сервис     | Стек               | Назначение                 |
|------------|--------------------|----------------------------|
| `client`   | Vue 3, Vite, npm   | Пользовательский интерфейс |
| `api`      | NestJS, TypeScript | REST API и бизнес-логика   |
| `postgres` | PostgreSQL 16      | СУБД                       |

---

## ⚙️ Сборка и запуск

```bash
# Сборка контейнеров
docker-compose build

# Запуск (в фоне или нет)
docker-compose up
# или
docker-compose up -d
