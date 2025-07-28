# Movies Backend API

A simple Node.js backend API for managing movies using Express.js, TypeORM, MySQL, and Zod validation.

## Features

- ✅ RESTful API endpoints for CRUD operations
- 📄 Pagination support for listing movies
- 🔍 Search and filtering capabilities
- ✨ Input validation using Zod schemas
- 🗄️ MySQL database with TypeORM
- 🔧 Environment-based configuration
- 🎯 Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd ezz-be
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_password
   DB_DATABASE=movies_db
   
   # Server Configuration
   PORT=3000
   
   # Environment
   NODE_ENV=development
   ```

4. **Create MySQL database:**
   ```sql
   CREATE DATABASE movies_db;
   ```

5. **Start the server:**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with auto-restart)
   npm run dev
   ```

The server will start on `http://localhost:3000` and automatically create the database tables.

## API Documentation

### Base URL
```
http://localhost:3000/api/movies
```

### Endpoints

#### 1. Get All Movies
- **URL:** `GET /api/movies`
- **Query Parameters:**
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10, max: 100)
  - `type` (optional): Filter by type ("Movie" or "TV Show")
  - `director` (optional): Filter by director name (partial match)
  - `search` (optional): Search in title, director, or location

**Example:**
```bash
curl "http://localhost:3000/api/movies?page=1&limit=5&type=Movie&search=Nolan"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Inception",
      "type": "Movie",
      "director": "Nolan",
      "budget": "$160M",
      "location": "LA, Paris",
      "duration": "148 min",
      "yearTime": "2010",
      "description": "A mind-bending thriller",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  }
}
```

#### 2. Get Movie by ID
- **URL:** `GET /api/movies/:id`

**Example:**
```bash
curl "http://localhost:3000/api/movies/1"
```

#### 3. Create New Movie
- **URL:** `POST /api/movies`
- **Body:** JSON object with movie data

**Required fields:**
- `title` (string, max 255 chars)
- `director` (string, max 255 chars)

**Optional fields:**
- `type` (enum: "Movie" or "TV Show", default: "Movie")
- `budget` (string, max 100 chars)
- `location` (string, max 255 chars)
- `duration` (string, max 100 chars)
- `yearTime` (string, max 100 chars)
- `description` (string)

**Example:**
```bash
curl -X POST "http://localhost:3000/api/movies" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Dark Knight",
    "type": "Movie",
    "director": "Christopher Nolan",
    "budget": "$185M",
    "location": "Chicago, Pittsburgh",
    "duration": "152 min",
    "yearTime": "2008",
    "description": "Batman faces the Joker"
  }'
```

#### 4. Update Movie
- **URL:** `PUT /api/movies/:id`
- **Body:** JSON object with fields to update (all fields optional)

**Example:**
```bash
curl -X PUT "http://localhost:3000/api/movies/1" \
  -H "Content-Type: application/json" \
  -d '{
    "budget": "$200M",
    "description": "Updated description"
  }'
```

#### 5. Delete Movie
- **URL:** `DELETE /api/movies/:id`

**Example:**
```bash
curl -X DELETE "http://localhost:3000/api/movies/1"
```

### Health Check
- **URL:** `GET /health`
- **Description:** Check if the API is running

### API Documentation
- **URL:** `GET /`
- **Description:** View available endpoints

## Database Schema

The `movies` table includes the following fields:

| Field | Type | Description |
|-------|------|-------------|
| id | int (PK) | Auto-incrementing primary key |
| title | varchar(255) | Movie/show title (required) |
| type | enum | "Movie" or "TV Show" (default: "Movie") |
| director | varchar(255) | Director name (required) |
| budget | varchar(100) | Budget information |
| location | varchar(255) | Filming location |
| duration | varchar(100) | Runtime duration |
| year_time | varchar(100) | Release year/time period |
| description | text | Movie description |
| created_at | timestamp | Record creation time |
| updated_at | timestamp | Record update time |

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors (when applicable)
}
```

### HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Project Structure
```
ezz-be/
├── config/
│   └── database.js          # TypeORM configuration
├── controllers/
│   └── movieController.js   # Movie business logic
├── entities/
│   └── Movie.js            # Movie entity definition
├── routes/
│   └── movieRoutes.js      # API routes
├── schemas/
│   └── movieSchemas.js     # Zod validation schemas
├── index.js                # Main server file
├── package.json
└── README.md
```

### Technologies Used
- **Express.js** - Web framework
- **TypeORM** - Object-Relational Mapping
- **MySQL2** - MySQL database driver
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## License

ISC 


#### How to run
cp .env.example ./.env
docker-compose up -d
npm run dev