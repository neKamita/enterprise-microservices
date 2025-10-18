# Quick Start Guide

## Запуск за 3 шага

### 1. Запустить Docker Compose

```bash
cd /home/rachi/Documents/Project/Windsurf/Enterprise
docker-compose up -d
```

### 2. Дождаться запуска всех сервисов (~2-3 минуты)

Проверить статус:
```bash
docker-compose ps
```

Все сервисы должны быть в статусе "Up"

### 3. Открыть приложение

- Frontend: http://localhost:3000
- Eureka Dashboard: http://localhost:8761

## Первые шаги

### Создать аккаунт

1. Откройте http://localhost:3000
2. Нажмите "Register"
3. Заполните форму регистрации
4. Войдите в систему

### Создать тестовые данные

```bash
# Создать продукт (требуется токен)
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Test Product",
    "description": "Test Description",
    "price": 99.99,
    "stock": 100,
    "category": "Test",
    "active": true
  }'
```

### Создать заказ

1. Перейдите на страницу Products
2. Выберите продукт
3. Нажмите "Order Now"
4. Проверьте заказ в разделе Orders

## Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Просмотр логов конкретного сервиса
docker-compose logs -f user-service

# Остановить все
docker-compose down

# Перезапустить сервис
docker-compose restart user-service

# Очистить все данные
docker-compose down -v
```

## Endpoints для тестирования

### Регистрация
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Вход
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Получить продукты
```bash
curl http://localhost:8080/api/products/active
```

## Troubleshooting

**Проблема:** Сервис не запускается

**Решение:**
```bash
docker-compose logs service-name
docker-compose restart service-name
```

**Проблема:** База данных не доступна

**Решение:**
```bash
docker-compose down -v
docker-compose up -d
```

**Проблема:** Frontend не подключается

**Решение:** Проверьте что API Gateway запущен на порту 8080
