# Auth Service API

This project is an authentication service API built with TypeScript and Express. It includes user registration, login, and value storage functionalities. The API documentation is provided via Swagger.

## Features

- User registration and login with JWT authentication.
- Value storage with expiration.
- Swagger documentation using a YAML file.
- Integrated with Winston for logging.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/auth-service-test.git
   ```
2. Navigate to the project directory:
   ```bash
   cd auth-service-test
   ```
3. Install dependencies
   ```bash
   cd auth-service-test
   ```

## Configuration

Set up the environment variables in a `.env` file. Required variables include:

```plaintext
PORT=port
POSTGRES_HOST=host
POSTGRES_PORT=poer
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=dbName
REDIS_HOST=host
REDIS_PORT=port
NODE_ENV=environment
JWT_SECRET=jwtsecret
```

## Running the Application

### Start the application:

```bash
npm start
```

# Access the Swagger documentation at:

```bash
http://localhost:3000/api
```

## Scripts:

```plaintext
npm start: Starts the server.
npm run dev: Starts the server in development mode.
```
