# Nest CRUD API with PostgreSQL

This is a basic CRUD API built with Nest.js to manage a PostgreSQL database. It provides endpoints for managing users and wallet addresses.

## Setup Instructions

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/ThisisMS11/Nest_CRUD
   ```

2. **Install Dependencies**:
   ```bash
   cd Nest_CRUD
   npm install
   ```

3. **Database Setup**:
   - Create a PostgreSQL database.
   - Update the database connection configuration in `app.module.ts`.

Example configuration (replace username , password and database name as per your own in app.module.ts):
```
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cutoff_user',
      password: 'cutoff',
      database: 'cutoff',
      entities: [User, WalletAddress],
      synchronize: true,
    }),
  ],
})
```

4. **Run the Application**:
   ```bash
   npm run start
   ```

5. **Test the API**:
   - You can use tools like Postman or cURL to test the API endpoints.

## API Documentation

### Users

#### Create User

- **URL**: `/users`
- **Method**: `POST`
- **Request Body**:
  ```typescript
  {
    "name": string,
    "email": string,
    "password": string
  }
  ```
- **Response**:
  ```typescript
  {
    "id": number,
    "name": string,
    "email": string,
  }
  ```

#### Get All Users

- **URL**: `/users`
- **Method**: `GET`
- **Response**:
  ```typescript
  [
    {
      "id": number,
      "name": string,
      "email": string
    },
    ...
  ]
  ```

#### Get User by ID

- **URL**: `/users/:id`
- **Method**: `GET`
- **Response**:
  ```typescript
  {
    "id": number,
    "name": string,
    "email": string
  }
  ```

#### Update User

- **URL**: `/users/:id` (id represents the user whose information is to be updated.)
- **Method**: `PUT`
- **Request Body**:
  ```typescript
  {
    "id": number, (current user id for validation purposes)
    "email": string,
    "password": string
  }
  ```
- **Response**:
  ```typescript
  {
    "message": "Update Successful"
  }
  ```

#### Delete User

- **URL**: `/users/:id` (id represents the user whose information is to be updated.)
- **Method**: `DELETE`
- **Request Body**:
  ```typescript
  {
    "userId": number, (current user id for validation purposes)
  }
  ```
- **Response**:
  ```typescript
  {
    "message": "Deletion Successful"
  }
  ```

## Wallet Addresses

#### Create Wallet Address

- **URL**: `/wallet-address`
- **Method**: `POST`
- **Request Body**:
  ```typescript
  {
    "userId": number,
    "address": string
  }
  ```
- **Response**:
  ```typescript
  {
    "id": number,
    "address": string,
    "user": number
  }
  ```

#### Get All Wallet Addresses

- **URL**: `/wallet-address`
- **Method**: `GET`
- **Response**:
  ```typescript
  [
    {
      "id": number,
      "address": string,
      "user": {
        "id": number,
        "name": string,
        "email": string
      }
    },
    ...
  ]
  ```

#### Get Wallet Address by ID

- **URL**: `/wallet-address/:id` (id of the wallet address to be fetched)
- **Method**: `GET`
- **Response**:
  ```typescript
  {
    "id": number,
    "address": string,
    "user": {
      "id": number,
      "name": string,
      "email": string
    }
  }
  ```

#### Update Wallet Address

- **URL**: `/wallet-address/:id` (id of the wallet address to be updated)
- **Method**: `PUT`
- **Request Body**:
  ```typescript
  {
    "user": number,
    "address": string
  }
  ```
- **Response**:
  ```typescript
  {
    "message": "Update Successful"
  }
  ```

#### Delete Wallet Address

- **URL**: `/wallet-address/:id` (id of the wallet address to be deleted)
- **Method**: `DELETE`
- **Request Body**:
  ```typescript
  {
    "userId": number  
  }
  ```
- **Response**:
  ```typescript
  {
    "message": "Deletion Successful"
  }
  ```


## Thank You.