# eCommerce REST API

A RESTful backend API built with Node.js, Express, TypeScript, and MongoDB.

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **Database**: MongoDB (Mongoose)
- **Validation**: Zod
- **Dev Server**: tsx

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local or Atlas)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
```

### Run Development Server

```bash
npm run dev
```

## API Endpoints

Base URL: `http://localhost:5000/api`

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all categories |
| GET | `/categories/:id` | Get category by ID |
| POST | `/categories` | Create category |
| PUT | `/categories/:id` | Update category |
| DELETE | `/categories/:id` | Delete category |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Get all products (supports `?categoryId=` filter) |
| GET | `/products/:id` | Get product by ID |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| DELETE | `/products/:id` | Delete product |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/orders` | Get all orders |
| GET | `/orders/:id` | Get order by ID |
| POST | `/orders` | Create order |
| PUT | `/orders/:id` | Update order |
| DELETE | `/orders/:id` | Delete order |

## Request Examples

### Create a Category
```json
POST /api/categories
{
  "name": "Electronics"
}
```

### Create a Product
```json
POST /api/products
{
  "name": "Laptop",
  "description": "A powerful laptop",
  "price": 999,
  "categoryId": "<category_id>"
}
```

### Create a User
```json
POST /api/users
{
  "name": "Max Mustermann",
  "email": "max@example.com"
}
```

### Create an Order
```json
POST /api/orders
{
  "userId": "<user_id>",
  "products": [
    {
      "productId": "<product_id>",
      "quantity": 2
    }
  ]
}
```

## Business Rules

- Creating or updating a product fails if the `categoryId` does not exist
- Creating an order fails if the `userId` or any `productId` does not exist
- Order `total` is automatically calculated from current product prices × quantities
- Passwords are never returned in API responses
- `_id` is normalized to `id` in all responses

## Project Structure

```
src/
├── controllers/    # Request handlers
├── middleware/     # Error handler, validation
├── models/         # Mongoose schemas
├── routes/         # Express routers
├── schemas/        # Zod validation schemas
├── db/             # Database connection
├── app.ts          # Express app setup
└── server.ts       # Entry point
```
