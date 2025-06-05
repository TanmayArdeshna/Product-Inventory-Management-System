# Product Inventory Management System

A full-stack MERN application for managing product inventory with features including product creation, listing, searching, filtering, and pagination.

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Routing
- **React Hot Toast** - Toast notifications
- **React Multi-Select Component** - Multi-select dropdown

## ✨ Features

- **Product Management**
  - Create products with unique names
  - View products in a paginated list
  - Delete products

- **Search & Filter**
  - Search products by name
  - Filter products by multiple categories
  - Clear filters with one click

- **UI/UX**
  - Dark & Light mode theme
  - Responsive design
  - Form validation (client & server side)
  - Loading states & error handling
  - Toast notifications

- **Data Architecture**
  - MongoDB with Mongoose schemas
  - RESTful API endpoints
  - Pagination, search, and filtering support

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Atlas)
- Git

### Clone the Repository
```bash
git clone https://github.com/TanmayArdeshna/Product-Inventory-Management-System.git
cd Product-Inventory-Management-System
```

### Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start the server
node server.js
```

### Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get paginated products with optional search & filtering |
| POST | /api/products | Create a new product |
| DELETE | /api/products/:id | Delete a product by ID |
| GET | /api/products/categories | Get all categories |
| GET | /api/health | API health check |

### Query Parameters for GET /api/products

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search term for product names
- `categories` - Comma-separated category IDs
- `sortBy` - Field to sort by (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)



