### Restauranto

![logo](./frontend/public/logo.svg)

An app for simplifing managment of small food businesses

#### ⚙️ Running the App
You can run the app in development by using (on the root folder):

```shell
docker compose up -d
```

There is a need to setup environment variables at backend/.env, namely:

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`
- `DATABASE_URL`

#### 💽 Current Data Model
```mermaid
erDiagram
    Restaurant {
        uuid id PK
        string name
        string document
    }
    Category {
        int id PK
        string name
        uuid restaurantId FK
    }
    Item {
        uuid id PK
        string name
        decimal price
        int categoryId FK
    }
    Order {
        uuid id PK
        string status
        decimal totalAmount
        uuid restaurantId FK
    }
    OrderItem {
        uuid id PK
        int quantity
        decimal unitPrice
        uuid orderId FK
        uuid itemId FK
    }

    Restaurant ||--o{ Category : "possui"
    Restaurant ||--o{ Order : "recebe"
    Category ||--o{ Item : "agrupa"
    Order ||--o{ OrderItem : "contém"
    Item ||--o{ OrderItem : "vendido como"
```