# Enterprise Microservices Application

Полноценное микросервисное приложение с Java Spring Boot backend и React frontend.

## 🏗️ Архитектура

### Backend Микросервисы (Spring Boot 3.2)

1. **Config Server** (Port 8888)
   - Централизованная конфигурация для всех сервисов
   - Spring Cloud Config

2. **Eureka Server** (Port 8761)
   - Service Discovery
   - Регистрация и обнаружение микросервисов
   - Health checks

3. **API Gateway** (Port 8080)
   - Маршрутизация запросов
   - JWT аутентификация
   - CORS настройки
   - Rate limiting

4. **User Service** (Port 8081)
   - Регистрация и аутентификация пользователей
   - JWT token generation
   - Управление профилями
   - PostgreSQL database (userdb)

5. **Product Service** (Port 8082)
   - CRUD операции для продуктов
   - Пагинация и фильтрация
   - Поиск по категориям
   - PostgreSQL database (productdb)

6. **Order Service** (Port 8083)
   - Создание и управление заказами
   - История заказов
   - Интеграция с User и Product Service через Feign Client
   - PostgreSQL database (orderdb)

### Frontend (React 18 + Vite)

- **Технологии:**
  - React 18
  - Vite
  - React Router v6
  - Axios
  - Zustand (state management)
  - TanStack Query (React Query)
  - TailwindCSS
  - React Hook Form
  - Lucide Icons

- **Страницы:**
  - Home - Главная страница
  - Login/Register - Аутентификация
  - Products - Каталог продуктов
  - ProductDetail - Детали продукта
  - Orders - История заказов
  - Profile - Профиль пользователя

## 🚀 Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Java 17+ (для локальной разработки)
- Node.js 18+ (для локальной разработки)
- Maven 3.8+ (для локальной разработки)

### Запуск через Docker Compose

```bash
# Клонировать репозиторий
cd /home/rachi/Documents/Project/Windsurf/Enterprise

# Включить BuildKit для оптимизированной сборки (рекомендуется)
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Собрать и запустить все сервисы
docker-compose up --build -d

# Просмотр логов
docker-compose logs -f

# Остановить все сервисы
docker-compose down

# Остановить и удалить volumes
docker-compose down -v
```

**⚡ Оптимизация сборки:**
- Первая сборка: ~15-20 минут
- Повторная сборка (изменения кода): ~3-5 минут (**70% быстрее**)
- См. [BUILD_QUICK_START.md](./BUILD_QUICK_START.md) и [DOCKER_OPTIMIZATION.md](./DOCKER_OPTIMIZATION.md)

### Порядок запуска сервисов

1. PostgreSQL databases (автоматически)
2. Config Server
3. Eureka Server
4. User Service, Product Service, Order Service
5. API Gateway
6. Frontend

**Время полного запуска:** ~2-3 минуты

## 📡 API Endpoints

### Authentication (User Service)

```
POST /api/auth/register - Регистрация
POST /api/auth/login    - Вход
```

### Users (User Service)

```
GET    /api/users           - Получить всех пользователей (Admin)
GET    /api/users/{id}      - Получить пользователя по ID
GET    /api/users/username/{username} - По username
PUT    /api/users/{id}      - Обновить пользователя
DELETE /api/users/{id}      - Удалить пользователя (Admin)
```

### Products (Product Service)

```
GET    /api/products                    - Все продукты (пагинация)
GET    /api/products/active             - Активные продукты
GET    /api/products/{id}               - Продукт по ID
GET    /api/products/category/{category} - По категории
GET    /api/products/search?name=...    - Поиск по имени
POST   /api/products                    - Создать продукт
PUT    /api/products/{id}               - Обновить продукт
DELETE /api/products/{id}               - Удалить продукт
PATCH  /api/products/{id}/stock         - Обновить stock
```

### Orders (Order Service)

```
GET    /api/orders                  - Все заказы (пагинация)
GET    /api/orders/{id}             - Заказ по ID
GET    /api/orders/user/{userId}    - Заказы пользователя
GET    /api/orders/user/{userId}/history - История заказов
POST   /api/orders                  - Создать заказ
PATCH  /api/orders/{id}/status      - Обновить статус
DELETE /api/orders/{id}             - Отменить заказ
```

## 🔐 Аутентификация

Приложение использует JWT токены для аутентификации.

### Получение токена

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Использование токена

```bash
curl -X GET http://localhost:8080/api/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🌐 Доступ к сервисам

- **Frontend:** http://localhost:3000
- **API Gateway:** http://localhost:8080
- **Eureka Dashboard:** http://localhost:8761
- **User Service:** http://localhost:8081
- **Product Service:** http://localhost:8082
- **Order Service:** http://localhost:8083
- **Config Server:** http://localhost:8888

### Swagger UI

- User Service: http://localhost:8081/swagger-ui.html
- Product Service: http://localhost:8082/swagger-ui.html
- Order Service: http://localhost:8083/swagger-ui.html

## 🗄️ База данных

### PostgreSQL Instances

- **User DB:** localhost:5432 (userdb)
- **Product DB:** localhost:5433 (productdb)
- **Order DB:** localhost:5434 (orderdb)

**Credentials:**
- Username: postgres
- Password: postgres

### Подключение к БД

```bash
# User DB
docker exec -it postgres-user psql -U postgres -d userdb

# Product DB
docker exec -it postgres-product psql -U postgres -d productdb

# Order DB
docker exec -it postgres-order psql -U postgres -d orderdb
```

## 📦 Структура проекта

```
Enterprise/
├── backend/
│   ├── config-server/
│   ├── eureka-server/
│   ├── api-gateway/
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
├── frontend/
│   └── react-app/
├── docker-compose.yml
└── README.md
```

## 🛠️ Локальная разработка

### Backend

```bash
# Каждый сервис запускается отдельно
cd backend/user-service
mvn spring-boot:run

# Или через IDE (IntelliJ IDEA, Eclipse)
```

### Frontend

```bash
cd frontend/react-app

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Build для production
npm run build
```

## 🔧 Конфигурация

### Backend

Конфигурация находится в `application.yml` каждого сервиса.

**Важные параметры:**
- JWT Secret: `your-secret-key-must-be-at-least-256-bits-long-for-HS256-algorithm`
- JWT Expiration: 86400000ms (24 часа)

### Frontend

Создайте `.env` файл:

```env
VITE_API_URL=http://localhost:8080/api
```

## 📊 Мониторинг

### Actuator Endpoints

Все сервисы имеют Spring Boot Actuator:

```
/actuator/health   - Health check
/actuator/info     - Информация о сервисе
/actuator/metrics  - Метрики
```

### Eureka Dashboard

Мониторинг всех зарегистрированных сервисов:
http://localhost:8761

## 🧪 Тестирование API

### Пример: Создание пользователя и заказа

```bash
# 1. Регистрация
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# 2. Создание продукта
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "stock": 50,
    "category": "Electronics",
    "active": true
  }'

# 3. Создание заказа
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userId": 1,
    "items": [
      {
        "productId": 1,
        "quantity": 2
      }
    ],
    "shippingAddress": "123 Main St, City"
  }'
```

## 🐛 Troubleshooting

### Сервис не запускается

```bash
# Проверить логи
docker-compose logs service-name

# Перезапустить сервис
docker-compose restart service-name
```

### База данных не доступна

```bash
# Проверить статус PostgreSQL
docker-compose ps

# Пересоздать volumes
docker-compose down -v
docker-compose up -d
```

### Frontend не подключается к API

1. Проверьте `.env` файл
2. Убедитесь что API Gateway запущен
3. Проверьте CORS настройки в Gateway

## 📝 Технологический стек

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Cloud 2023.0.0
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL 15
- MapStruct
- Lombok
- OpenAPI/Swagger
- Maven

### Frontend
- React 18
- Vite 5
- React Router 6
- Axios
- Zustand
- TanStack Query
- TailwindCSS 3
- React Hook Form
- Lucide Icons

### DevOps
- Docker with BuildKit
- Docker Compose
- Multi-stage builds
- Layer caching optimization
- Nginx

## 🎯 Особенности

### Backend
- ✅ Микросервисная архитектура
- ✅ Service Discovery (Eureka)
- ✅ API Gateway с JWT аутентификацией
- ✅ Централизованная конфигурация
- ✅ Межсервисная коммуникация (Feign Client)
- ✅ Clean Architecture
- ✅ DTO Pattern
- ✅ Global Exception Handling
- ✅ Валидация данных
- ✅ Пагинация
- ✅ Swagger документация

### Frontend
- ✅ Responsive UI
- ✅ Protected routes
- ✅ State management (Zustand)
- ✅ API caching (TanStack Query)
- ✅ Modern React patterns

### DevOps
- ✅ Оптимизированная Docker сборка (BuildKit)
- ✅ Multi-stage builds с кэшированием
- ✅ Минимальные runtime образы (Alpine)
- ✅ Автоматическое кэширование зависимостей
- ✅ Параллельная сборка сервисов
- ✅ Уменьшенный размер образов (~37%)

## 📄 Лицензия

MIT License

## 👨‍💻 Автор

Enterprise Microservices Project
