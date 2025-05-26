# Thunder Client Test Collection

This folder contains test files for testing the Colori Platform API using Thunder Client.

## Setup

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   # or
   yarn dev
   ```

2. **Base URL:** `http://localhost:3001/api`

3. **Import Collections:**
   - Import the JSON files in Thunder Client
   - Or use the individual request files as reference

## Available Endpoints

### Authentication
- `POST /users/login` - User login
- `POST /users/logout` - User logout (requires auth)

### Users
- `GET /users` - Get all users (requires auth)
- `GET /users/:id` - Get user by ID (requires auth)
- `POST /users` - Create user (requires auth)
- `PUT /users/:id` - Update user (requires auth)
- `DELETE /users/:id` - Delete user (requires auth)

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (requires auth)
- `PUT /products/:id` - Update product (requires auth)
- `DELETE /products/:id` - Delete product (requires auth)

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category (requires auth)
- `PUT /categories/:id` - Update category (requires auth)
- `DELETE /categories/:id` - Delete category (requires auth)

### Orders
- `GET /orders` - Get all orders
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

### Promotions
- `GET /promotions` - Get all promotions
- `GET /promotions/:id` - Get promotion by ID
- `POST /promotions` - Create promotion (requires auth)
- `PUT /promotions/:id` - Update promotion (requires auth)
- `DELETE /promotions/:id` - Delete promotion (requires auth)

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /events` - Create event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

## Authentication

For endpoints that require authentication, you need to:

1. First login using `POST /users/login`
2. Copy the JWT token from the response
3. Add it to the Authorization header: `Bearer <token>`

## Test Data

The `test-data/` folder contains sample JSON payloads for creating and updating resources. 