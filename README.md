# MERN Estate - Real Estate Platform

A full-stack real estate platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to list, search, and manage property listings.

## Features

- User authentication (sign up, sign in, profile management)
- Property listing creation and management
- Advanced property search with filters
- Property details with image gallery
- Contact form for property inquiries
- Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd mern-estate
```

2. Install server dependencies:
```bash
cd api
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

4. Create a `.env` file in the `api` directory with the following variables:
```
MONGO=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=3000
```

5. Create a `.env` file in the `client` directory:
```
VITE_API_URL=http://localhost:3000/api
```

## Running the Application

1. Start the server:
```bash
cd api
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Project Structure

```
mern-estate/
├── api/                 # Backend
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── index.js        # Server entry point
│
└── client/             # Frontend
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   ├── App.jsx     # Main app component
    │   └── main.jsx    # Entry point
    └── public/         # Static files
```

## Technologies Used

- **Frontend:**
  - React.js
  - React Router
  - Axios
  - Tailwind CSS
  - React Icons

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication
  - Multer (for file uploads)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)


