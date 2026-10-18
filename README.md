# Todo List API

A RESTful Todo List API built with **Node.js**, **Express**, and **MongoDB**. The API provides user authentication, email OTP verification, password recovery, profile management, and authenticated todo management with filtering, pagination, soft deletion, restoration, and permanent deletion.

## Features

- User registration with Joi request validation
- Email OTP verification
- Login with access and refresh tokens
- HTTP-only refresh-token cookie support
- Logout and refresh-token invalidation
- Forgot-password and reset-password flow
- User profile retrieval and updates
- Password change
- Account soft deletion
- Create, read, update, and delete todos
- Todo statuses: `pending`, `in-progress`, and `completed`
- Todo priorities: `low`, `medium`, and `high`
- Due dates and pinned todos
- Soft-deleted todo trash
- Restore todos from trash
- Permanently delete todos
- Pagination and query-based todo filtering
- Centralized error handling
- MongoDB persistence through Mongoose
- ES modules support

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** Joi
- **Authentication:** JSON Web Tokens (JWT)
- **Password hashing:** bcrypt
- **Email:** Nodemailer
- **Configuration:** dotenv
- **Cookies:** cookie-parser

## Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/) 18 or newer
- npm
- MongoDB, either locally or through MongoDB Atlas
- An SMTP-enabled email account for OTP and password-reset emails

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/udaynarendra/todo-list-api.git
cd todo-list-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URL=mongodb://127.0.0.1:27017/todo-list-api

ADMIN_EMAIL=your-email@example.com
APP_PASSWORD=your-email-app-password

ACCESS_TOKEN_SECRET=replace-with-a-long-random-secret
REFRESH_TOKEN_SECRET=replace-with-another-long-random-secret
ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d
```

### Environment variables

| Variable | Description | Example |
| --- | --- | --- |
| `PORT` | Port used by the HTTP server | `5000` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://127.0.0.1:27017/todo-list-api` |
| `ADMIN_EMAIL` | Email account used to send application emails | `your-email@example.com` |
| `APP_PASSWORD` | SMTP provider app password or email password | `your-app-password` |
| `ACCESS_TOKEN_SECRET` | Secret used to sign access tokens | `long-random-secret` |
| `REFRESH_TOKEN_SECRET` | Secret used to sign refresh tokens | `another-long-random-secret` |
| `ACCESS_TOKEN_EXPIRES` | Access-token expiration duration | `15m` |
| `REFRESH_TOKEN_EXPIRES` | Refresh-token expiration duration | `7d` |

> Never commit `.env`, secrets, JWT keys, or email credentials to source control.

### 4. Start the server

```bash
node server.js
```

The API is available at:

```text
http://localhost:5000
```

The port is controlled by the `PORT` environment variable.

## Authentication

Protected endpoints require an access token in the `Authorization` header:

```http
Authorization: Bearer <access-token>
```

After a successful login, the API returns an access token in the response and stores the refresh token in an HTTP-only cookie named `refreshToken`.

## API Overview

The base URL for all versioned endpoints is:

```text
http://localhost:5000/api/v1
```

### Authentication endpoints

| Method | Endpoint | Auth required | Description |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | No | Register a new user |
| `POST` | `/api/v1/auth/verify-otp` | No | Verify registration OTP |
| `POST` | `/api/v1/auth/resend-otp` | No | Resend registration OTP |
| `POST` | `/api/v1/auth/login` | No | Log in and receive an access token |
| `POST` | `/api/v1/auth/logout` | Refresh cookie | Log out and clear the refresh token |
| `POST` | `/api/v1/auth/forgot-password` | No | Start password-reset flow |
| `POST` | `/api/v1/auth/forgot-password/verify-otp` | No | Verify password-reset OTP |
| `POST` | `/api/v1/auth/resetPassword` | No | Set a new password using a reset token |

#### Register

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Secure@123"
}
```

Passwords must be at least eight characters long and contain an uppercase letter, lowercase letter, number, and special character.

#### Verify registration OTP

```http
POST /api/v1/auth/verify-otp
Content-Type: application/json
```

```json
{
  "email": "jane@example.com",
  "otp": "123456"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "jane@example.com",
  "password": "Secure@123"
}
```

Example response shape:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "<jwt-access-token>"
  }
}
```

### User endpoints

All user endpoints require a bearer access token.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/users/me` | Get the authenticated user |
| `PATCH` | `/api/v1/users/me` | Update the user's name |
| `PATCH` | `/api/v1/users/me/password` | Change the user's password |
| `PATCH` | `/api/v1/users/me/delete` | Soft-delete the user's account |

#### Update profile

```http
PATCH /api/v1/users/me
Authorization: Bearer <access-token>
Content-Type: application/json
```

```json
{
  "name": "Jane Smith"
}
```

#### Change password

```http
PATCH /api/v1/users/me/password
Authorization: Bearer <access-token>
Content-Type: application/json
```

```json
{
  "currentPassword": "Secure@123",
  "newPassword": "NewSecure@456",
  "confirmPassword": "NewSecure@456"
}
```

### Todo endpoints

All todo endpoints require a bearer access token.

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/v1/todos` | Create a todo |
| `GET` | `/api/v1/todos` | List the authenticated user's active todos |
| `GET` | `/api/v1/todos/:id` | Get one todo |
| `PATCH` | `/api/v1/todos/:id` | Update a todo |
| `DELETE` | `/api/v1/todos/:id` | Move a todo to trash |
| `GET` | `/api/v1/todos/trash` | List trashed todos |
| `PATCH` | `/api/v1/todos/:id/restore` | Restore a trashed todo |
| `DELETE` | `/api/v1/todos/:id/permanent` | Permanently delete a todo |

#### Create a todo

```http
POST /api/v1/todos
Authorization: Bearer <access-token>
Content-Type: application/json
```

```json
{
  "title": "Learn Express.js",
  "description": "Build a REST API with Express and MongoDB.",
  "priority": "high",
  "dueDate": "2026-12-31T23:59:59.000Z"
}
```

Required fields:

- `title`
- `description`

Optional fields:

- `priority`: `low`, `medium`, or `high`
- `dueDate`: an ISO-compatible date or `null`

#### List todos

```http
GET /api/v1/todos
Authorization: Bearer <access-token>
```

The list endpoint supports pagination and repository-level query filters. Examples:

```text
GET /api/v1/todos?page=1&limit=10
GET /api/v1/todos?status=completed
GET /api/v1/todos?priority=high
```

Example response shape:

```json
{
  "success": "success",
  "message": "Data Retrieved Successfully",
  "userTodos": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

#### Update a todo

```http
PATCH /api/v1/todos/:id
Authorization: Bearer <access-token>
Content-Type: application/json
```

```json
{
  "status": "completed",
  "priority": "medium",
  "dueDate": null,
  "ispinned": true
}
```

At least one update field is required. Supported fields are:

- `status`: `pending`, `in-progress`, or `completed`
- `priority`: `low`, `medium`, or `high`
- `dueDate`: an ISO-compatible date or `null`
- `ispinned`: `true` or `false`

#### Delete, restore, and permanently delete

A regular delete is a soft delete and moves the todo to trash:

```http
DELETE /api/v1/todos/:id
Authorization: Bearer <access-token>
```

List trashed todos:

```http
GET /api/v1/todos/trash
Authorization: Bearer <access-token>
```

Restore a todo:

```http
PATCH /api/v1/todos/:id/restore
Authorization: Bearer <access-token>
```

Permanently delete a todo:

```http
DELETE /api/v1/todos/:id/permanent
Authorization: Bearer <access-token>
```

> Permanent deletion cannot be undone. Use it only when the todo should be removed from the database permanently.

## Data Models

### User

Users include:

- `name`
- `email`
- hashed `password`
- `role`: `user` or `admin`
- `isVerified`
- `status`: `active`, `blocked`, or `deleted`
- timestamps

### Todo

Todos include:

- `user`
- `title`
- `description`
- `status`
- `priority`
- `dueDate`
- `completedAt`
- `reminder`
- `tags`
- `ispinned`
- `isAchieved`
- `isDeleted`
- `deletedAt`
- timestamps

## Project Structure

```text
.
├── server.js                  # Application entry point
├── package.json               # Dependencies and project metadata
├── .env                       # Local environment configuration
├── src/
│   ├── app.js                 # Express application setup
│   ├── auth/                  # Authentication controllers, services, routes, and models
│   ├── config/                # Environment and MongoDB configuration
│   ├── constants/             # Shared messages and status codes
│   ├── middlewares/           # Validation and error middleware
│   ├── notifications/         # Notification model
│   ├── templates/              # Email templates
│   ├── todos/                 # Todo controllers, services, repositories, routes, and models
│   ├── users/                 # User controllers, services, repositories, routes, and models
│   └── utils/                 # API errors, tokens, email, OTP, and response helpers
└── README.md
```

The application follows a layered structure:

```text
Route → Middleware → Controller → Service → Repository → Model
```

## Response Format

Most successful responses use the following structure:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Todo-list responses may additionally include `userTodos` and `pagination` fields.

## Development Notes

- The project uses ES modules, so imports and exports use `import` and `export` syntax.
- There is currently no test script configured in `package.json`.
- Start the server with `node server.js`.
- Use a development process manager such as Nodemon if desired:

```bash
npx nodemon server.js
```

## Error Handling

The API uses centralized error handling and standard HTTP status codes, including:

- `200 OK`
- `201 Created`
- `204 No Content`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `409 Conflict`
- `429 Too Many Requests`
- `500 Internal Server Error`

## Security Recommendations

For production deployments:

- Use strong, randomly generated JWT secrets.
- Store secrets in environment variables or a secret manager.
- Use HTTPS so secure cookies and bearer tokens are protected in transit.
- Configure CORS and trusted origins explicitly if a frontend is added.
- Add rate limiting to authentication and OTP endpoints.
- Add automated tests before deploying changes.
- Use a dedicated SMTP provider and an app password instead of a personal email password.
- Review cookie settings for the deployment environment.

## License

This project currently uses the `ISC` license as specified in `package.json`.

## Author

Developed by **Uday Narendra**.
