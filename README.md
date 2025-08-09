# URL Shortener

A full-stack URL shortener application built with React frontend and Node.js/Express/MongoDB backend.

## Features

- **URL Shortening**: Convert long URLs into short, shareable links
- **URL Redirection**: Automatically redirect users from short URLs to original URLs
- **Click Tracking**: Track how many times each short URL has been visited
- **Admin Panel**: View all shortened URLs with statistics and management options
- **Responsive Design**: Modern, mobile-friendly interface

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests
- shortid for generating unique short codes

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Modern CSS with responsive design

## Project Structure

```
URL_Shortner/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── Url.js
│   ├── routes/
│   │   └── urlRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── AdminPanel.js
    │   │   ├── AdminPanel.css
    │   │   ├── Navbar.js
    │   │   ├── Navbar.css
    │   │   ├── UrlShortener.js
    │   │   └── UrlShortener.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/url-shortener
   BASE_URL=http://localhost:5000
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

### Database Setup

Make sure MongoDB is running on your system. The application will automatically create the necessary collections.

## API Endpoints

### POST /api/shorten
Create a new short URL.

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "shortUrl": "http://localhost:5000/abc123",
  "shortCode": "abc123"
}
```

### GET /:shortcode
Redirect to the original URL and increment click count.

### GET /api/urls
Get all URLs with statistics (for admin panel).

## Usage

1. **Shorten URLs**: Visit the home page, enter a long URL, and get a shortened version
2. **Use Short URLs**: Click or visit the short URL to be redirected to the original URL
3. **Admin Panel**: Visit `/admin` to view all URLs and their click statistics

## Features in Detail

### URL Shortening
- Validates input URLs
- Generates unique short codes using shortid
- Prevents duplicate entries for the same URL
- Returns existing short URL if URL was previously shortened

### Click Tracking
- Automatically increments click count when short URL is accessed
- Stores click statistics in MongoDB
- Displays click counts in admin panel

### Admin Panel
- Lists all shortened URLs
- Shows click statistics for each URL
- Displays creation dates
- Provides copy-to-clipboard functionality
- Shows summary statistics (total URLs, total clicks, most clicked)

## Development

### Running in Development Mode

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

The backend will run on `http://localhost:5000` and the frontend on `http://localhost:3000`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License
