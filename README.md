# Mini Drive

A stripped-down version of Google Drive. This project allows users to upload, manage, and share files and folders in a structured and user-friendly way.

## Features

- User authentication and session management
- File and folder creation, renaming, and deletion
- File uploads with size tracking
- Folder sharing with expiration dates
- Organized folder hierarchy
- Validation for files and folders

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (managed with Prisma ORM)
- **Authentication**: Passport.js with session-based authentication
- **Frontend**: EJS templates for server-side rendering
- **Styling**: CSS
- **Other Libraries**:
  - bcryptjs for password hashing
  - dotenv for environment variable management
  - multer for file uploads
  - express-validator for input validation

## Usage

### Prerequisites

- Node.js and npm installed
- PostgreSQL database set up
- Environment variables configured in a `.env` file (refer to `.env.example` for required variables):
  - `DATABASE_URL`: Your PostgreSQL connection string in the format `postgresql://username:password@localhost:5432/database_name`
  - `SESSION_SECRET`: A secret key for session management
  - `SUPABASE_KEY`: Your Supabase API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gofhilman/file-uploader.git
   cd file-uploader
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database:
   - Run Prisma migrations:

     ```bash
     npx prisma migrate dev
     ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

### Running the Application

- Start the development server:

  ```bash
  npm run dev
  ```
  
- Start the production server:

  ```bash
  npm start
  ```

### Accessing the Application

- Open your browser and navigate to `http://localhost:3000` (or the port specified in your environment).
