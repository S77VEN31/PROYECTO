# Troubleshooting Guide

## Common Issues and Solutions

### 1. Validation Errors

#### Problem: "Required" field errors
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "code": "invalid_type",
      "expected": "string",
      "received": "undefined",
      "path": ["email"],
      "message": "Required"
    }
  ]
}
```

**Causes:**
- Missing required fields in request body
- Incorrect Content-Type header
- Malformed JSON in request body

**Solutions:**
1. **Check Content-Type header**: Ensure it's set to `application/json`
2. **Verify JSON format**: Make sure your JSON is valid and properly formatted
3. **Include all required fields**: Check the schema requirements for each endpoint

#### Example: Login Request
```http
POST http://localhost:3001/api/users/login
Content-Type: application/json

{
  "email": "admin@colori.com",
  "password": "admin123"
}
```

### 2. Authentication Errors

#### Problem: 401 Unauthorized
```json
{
  "success": false,
  "error": "Authentication failed",
  "message": "Invalid email or password"
}
```

**Solutions:**
1. **Check credentials**: Verify email and password are correct
2. **Default admin credentials**: 
   - Email: `admin@colori.com`
   - Password: `admin123`
3. **Token expiration**: Re-login if token has expired

#### Problem: Missing Authorization Header
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

**Solution:**
Add the Authorization header with Bearer token:
```
Authorization: Bearer your-jwt-token-here
```

### 3. Server Connection Issues

#### Problem: Connection Refused
```
Error: connect ECONNREFUSED 127.0.0.1:3001
```

**Solutions:**
1. **Start the backend server**:
   ```bash
   cd backend
   npm run dev
   ```
2. **Check port**: Verify server is running on port 3001
3. **Check firewall**: Ensure port 3001 is not blocked

### 4. Database Issues

#### Problem: MongoDB Connection Error
```
Error: MongoNetworkError: failed to connect to server
```

**Solutions:**
1. **Start MongoDB**: Ensure MongoDB is running
2. **Check connection string**: Verify `MONGODB_URI` in environment variables
3. **Default connection**: `mongodb://localhost:27017/colori-platform`

### 5. Schema Validation Issues

#### Problem: Invalid UUID format
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "code": "invalid_string",
      "validation": "uuid",
      "path": ["id"],
      "message": "Invalid uuid"
    }
  ]
}
```

**Solution:**
Use valid UUID format: `550e8400-e29b-41d4-a716-446655440000`

#### Problem: Invalid enum values
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "code": "invalid_enum_value",
      "options": ["admin", "manager", "chef", "server", "cashier"],
      "path": ["role"],
      "message": "Invalid enum value"
    }
  ]
}
```

**Solution:**
Use valid enum values:
- User roles: `admin`, `manager`, `chef`, `server`, `cashier`
- Order status: `PENDING`, `PREPARING`, `READY`, `COMPLETED`, `CANCELLED`
- Payment methods: `CASH`, `CREDIT_CARD`, `DEBIT_CARD`

### 6. Request Format Issues

#### Problem: Nested object validation
Some endpoints expect nested objects. Check the schema requirements.

**Example: Product creation (if using nested format)**
```json
{
  "product": {
    "name": "Pizza Margherita",
    "description": "Classic pizza",
    "price": 12.99,
    "categoryId": "uuid-here"
  }
}
```

**Example: Simple format**
```json
{
  "name": "Pizza Margherita",
  "description": "Classic pizza",
  "price": 12.99,
  "categoryId": "uuid-here"
}
```

### 7. Environment Variables

#### Problem: Missing environment variables
Ensure these are set in your `.env` file:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/colori-platform
JWT_SECRET=your-secret-key
NODE_ENV=development
```

### 8. CORS Issues

#### Problem: CORS errors in browser
```
Access to fetch at 'http://localhost:3001/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
The backend should have CORS enabled. Check `server.ts`:
```typescript
app.use(cors());
```

## Testing Workflow

### Step-by-Step Debugging

1. **Verify server is running**
   ```bash
   curl http://localhost:3001/api/users
   ```

2. **Test login first**
   ```bash
   curl -X POST http://localhost:3001/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@colori.com","password":"admin123"}'
   ```

3. **Use the token for authenticated requests**
   ```bash
   curl http://localhost:3001/api/users \
     -H "Authorization: Bearer your-token-here"
   ```

### Common Test Sequence

1. **Login** → Get token
2. **Create Category** → Get category ID
3. **Create Product** → Get product ID (requires category ID)
4. **Create Order** → Get order ID (requires product ID)
5. **Update Order** → Test order lifecycle

## Getting Help

If you're still having issues:

1. Check the server logs for detailed error messages
2. Verify your request matches the examples in the test files
3. Use the browser's Network tab to inspect requests/responses
4. Compare your request with the working examples in `test-data/` folder 