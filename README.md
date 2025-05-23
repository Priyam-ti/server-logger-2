# Request Logger Application

This application logs all backend requests and displays them in real-time on a frontend interface. It consists of an Express backend server and a React frontend application.

## Setup and Running

### Backend Server

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:8001

### Frontend Application

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on http://localhost:3000

## Testing the Application

1. Open your browser and navigate to http://localhost:3000
2. Make requests to http://localhost:8001 using tools like Postman or curl
3. Try the following test endpoints:
   - GET http://localhost:8001/test
   - POST http://localhost:8001/api/data (with any JSON body)

All requests to the backend will be automatically logged and displayed in real-time on the frontend interface.

## Features

- Real-time request logging using Socket.IO
- Displays request method, URL, headers, and body
- Timestamps for each request
- Clean and modern UI using Material-UI
- Automatic sorting of logs (newest first) 