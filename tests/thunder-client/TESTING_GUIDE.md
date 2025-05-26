# Thunder Client Testing Guide

## Quick Start

### 1. Setup Environment
1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. Verify the server is running at `http://localhost:3001`

### 2. Import Collection
1. Open Thunder Client in VS Code
2. Click "Collections" tab
3. Click "Import" button
4. Select `colori-platform-collection.json`
5. The collection will be imported with all endpoints organized in folders

### 3. Set Environment Variables
1. Go to "Env" tab in Thunder Client
2. Select "Local Development" environment
3. Update the variables as needed:
   - `baseUrl`: Should be `http://localhost:3001/api`
   - `authToken`: Will be filled after login
   - Other IDs: Will be filled as you create resources

## Step-by-Step Testing Workflow

### Phase 1: Authentication
1. **Login**
   - Use the "Login" request in Authentication folder
   - Default credentials: `admin@colori.com` / `admin123`
   - Copy the JWT token from response
   - Update `authToken` environment variable

2. **Test Protected Endpoints**
   - Try "Get All Users" to verify authentication works
   - Should return user list if token is valid

### Phase 2: Basic CRUD Operations

#### Categories (Create First - Required for Products)
1. **Create Categories**
   - Use requests in Categories folder
   - Create: Pizzas, Beverages, Desserts, Appetizers
   - Copy category IDs from responses
   - Update `categoryId` environment variable

2. **Test Category Operations**
   - Get all categories
   - Get category by ID
   - Update category
   - Delete category (optional)

#### Products (Requires Categories)
1. **Create Products**
   - Use category IDs from previous step
   - Create products in different categories
   - Copy product IDs from responses
   - Update `productId` environment variable

2. **Test Product Operations**
   - Get all products
   - Get products by category
   - Get product by ID
   - Update product
   - Delete product (optional)

#### Orders (Requires Products)
1. **Create Orders**
   - Use product IDs from previous step
   - Start with simple order
   - Try complex order with multiple products
   - Copy order IDs from responses
   - Update `orderId` environment variable

2. **Test Order Operations**
   - Get all orders
   - Get order by ID
   - Update order status
   - Update complete order
   - Delete order (optional)

### Phase 3: Advanced Features

#### Users Management
1. **Create Users**
   - Create different user roles
   - Test user operations
   - Copy user IDs for testing

#### Promotions
1. **Create Promotions**
   - Create different promotion types
   - Test promotion operations

#### Events
1. **Create Events**
   - Create different event types
   - Test event operations

## Testing Scenarios

### Happy Path Testing
1. Complete order flow:
   - Create category → Create product → Create order → Update order status
2. User management flow:
   - Login → Create user → Update user → Get users
3. Promotion flow:
   - Create promotion → Apply to order → Test discount

### Error Testing
1. **Authentication Errors**
   - Try protected endpoints without token
   - Use invalid credentials
   - Use expired token

2. **Validation Errors**
   - Send invalid data formats
   - Missing required fields
   - Invalid UUIDs

3. **Not Found Errors**
   - Request non-existent resources
   - Use invalid IDs

### Edge Cases
1. **Boundary Values**
   - Negative prices
   - Zero quantities
   - Very long strings

2. **Business Logic**
   - Order with unavailable products
   - Promotions with past dates
   - Invalid table numbers

## Common Issues & Solutions

### 1. Authentication Token Expired
- **Problem**: 401 Unauthorized errors
- **Solution**: Re-login and update token in environment

### 2. Invalid UUIDs
- **Problem**: 400 Bad Request for ID parameters
- **Solution**: Use actual UUIDs from previous responses

### 3. Missing Dependencies
- **Problem**: Cannot create product without category
- **Solution**: Create categories first, then products

### 4. Server Not Running
- **Problem**: Connection refused errors
- **Solution**: Start backend server and verify port

## Environment Variables Reference

| Variable     | Description              | Example                                |
| ------------ | ------------------------ | -------------------------------------- |
| `baseUrl`    | API base URL             | `http://localhost:3001/api`            |
| `authToken`  | JWT authentication token | `eyJhbGciOiJIUzI1NiIs...`              |
| `userId`     | User ID for testing      | `550e8400-e29b-41d4-a716-446655440000` |
| `productId`  | Product ID for testing   | `550e8400-e29b-41d4-a716-446655440001` |
| `categoryId` | Category ID for testing  | `550e8400-e29b-41d4-a716-446655440002` |
| `orderId`    | Order ID for testing     | `550e8400-e29b-41d4-a716-446655440003` |

## Tips for Effective Testing

1. **Use Environment Variables**: Always use variables instead of hardcoded values
2. **Test in Order**: Follow the dependency chain (categories → products → orders)
3. **Save Important IDs**: Copy and save IDs from responses for future requests
4. **Test Both Success and Failure**: Don't just test happy paths
5. **Check Response Status**: Verify HTTP status codes match expectations
6. **Validate Response Data**: Check that response data structure is correct

## Automated Testing

For automated testing, consider:
1. Creating test scripts in Thunder Client
2. Setting up pre-request scripts for token refresh
3. Using test assertions to validate responses
4. Creating test suites for different scenarios 