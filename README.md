# JWT Authentication From Scratch

A full-stack authentication system built without any JWT libraries, featuring custom token creation/verification using Node's crypto, refresh token rotation, secure notes API, and a modern Next.js 14 frontend with shadcn/ui.

## Table of Contents

- [Features](#features)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Testing with cURL](#testing-with-curl)
- [Security Features](#security-features)
- [Technical Implementation](#technical-implementation)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [My Blog on Medium](#related-article)
- [Acknowledgments](#acknowledgments)

## Features

### Backend

- **Custom JWT Implementation** - HMAC-SHA256 signing without external libraries
- **Secure Password Hashing** - PBKDF2 with high iteration count
- **Token Management** - HTTP-only cookies for access & refresh tokens
- **Refresh Token Rotation** - Automatic token rotation on each refresh
- **Authorization** - Owner-based access control for resources

### Frontend

- **Modern UI** - Next.js 14 with App Router and shadcn/ui components
- **Authentication Flow** - Complete signup, login, and logout functionality
- **Protected Routes** - Secure dashboard with notes CRUD operations
- **Real-time State** - Context-based auth state management
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/sourabhaprasad/jwt-auth-no-lib.git
cd jwt-auth-no-lib
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/jwt-auth
JWT_SECRET=your-super-secure-secret-key-here
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Edit the `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 4. Start the Application

```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend development server
cd client
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

## Project Structure

```
jwt-auth-no-lib/
├── server/                          # Backend API
│   ├── config/                      # Environment configuration
│   ├── controllers/                 # Route handlers
│   ├── middleware/                  # Authentication & authorization
│   ├── models/                      # MongoDB schemas
│   ├── routes/                      # API route definitions
│   ├── utils/                       # JWT & password utilities
│   └── server.js                    # Express app entry point
└── client/                          # Frontend application
    ├── app/                         # Next.js App Router pages
    ├── components/                  # React components
    │   └── ui/                      # shadcn/ui components
    ├── lib/                         # Utilities & API client
    └── types/                       # TypeScript type definitions
```

## API Endpoints

### Authentication

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| `POST` | `/auth/signup`  | Register a new user      |
| `POST` | `/auth/login`   | Login and receive tokens |
| `POST` | `/auth/refresh` | Refresh access token     |
| `POST` | `/auth/logout`  | Logout and revoke tokens |

### Notes (Protected Routes)

| Method   | Endpoint     | Description              |
| -------- | ------------ | ------------------------ |
| `GET`    | `/notes`     | List user's notes        |
| `POST`   | `/notes`     | Create a new note        |
| `PUT`    | `/notes/:id` | Update note (owner only) |
| `DELETE` | `/notes/:id` | Delete note (owner only) |

## Testing with cURL

### Authentication

```bash
# Login
curl -X POST -c cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' \
  http://localhost:4000/auth/login

# Refresh tokens
curl -X POST -b cookies.txt -c cookies.txt \
  http://localhost:4000/auth/refresh
```

### Notes API

```bash
# Create a note
curl -X POST -b cookies.txt \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","content":"Note content"}' \
  http://localhost:4000/notes

# List notes
curl -X GET -b cookies.txt \
  http://localhost:4000/notes
```

## Security Features

- **PBKDF2 Password Hashing** - Secure password storage with high iteration count
- **Timing-Safe Comparison** - Prevents timing attacks on signature validation
- **Short-Lived Access Tokens** - 15-minute expiration for security
- **Refresh Token Rotation** - Automatic token rotation on each refresh
- **HTTP-Only Cookies** - XSS protection for token storage
- **Authorization Checks** - Owner-based access control for all resources
- **Custom JWT Implementation** - No external dependencies for token handling

## Technical Implementation

### JWT Implementation

The custom JWT implementation is located in `server/utils/jwt-utils.js`:

- Base64URL encoding/decoding
- HMAC-SHA256 signing using Node.js crypto
- Timing-safe signature validation
- Automatic expiration checking

### Authentication Flow

1. **Login**: Validate credentials → Issue access + refresh tokens (HTTP-only cookies)
2. **Requests**: Verify access token from cookie → Process request
3. **Refresh**: Validate refresh token → Rotate tokens → Issue new tokens
4. **Logout**: Invalidate refresh token → Clear cookies

### Frontend Architecture

- **Next.js 14** with App Router for modern React development
- **shadcn/ui** components with Tailwind CSS for consistent design
- **Context API** for global authentication state management
- **Protected routes** with automatic redirects for unauthenticated users

## Dependencies

### Backend

- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cookie-parser` - Cookie parsing middleware
- `dotenv` - Environment variable management

### Frontend

- `next` - React framework with App Router
- `react` & `react-dom` - UI library
- `shadcn/ui` - Component library (Radix UI + Tailwind)
- `lucide-react` - Icon library
- `tiptap editor` - Text editor compatible with nextjs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## Related Article

For a detailed explanation of the JWT implementation and technical insights, check out my blog post: [Building JWT Authentication From Scratch Without Libraries](https://medium.com/@sourabhaprasad/building-jwt-authentication-from-scratch-without-libraries-d590ff522e1b)
