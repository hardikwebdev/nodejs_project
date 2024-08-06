# Node Js

This Node.js application leverages **Express.js** for web services and **Sequelize** as the ORM to interact with a MySQL database. This guide will help you get started with setting up and running the project.

---

## 🚀 Getting Started

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **npm** (v6.x or higher)
- **MySQL** (v8.x or higher)

### 1. Clone the Repository

```bash
git clone https://github.com/hardikwebdev/nodejs_project.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
# Server configuration
PORT=3000

# Database configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password

# Sequelize configuration
SEQUELIZE_LOGGING=false
```

### 4. Set Up the Database

Ensure MySQL is running and create your database:

```sql
CREATE DATABASE your_database_name;
```

### 5. Run the Server

Start your server:

```bash
npm start
```

The server will be available at `http://localhost:3000` (or the port specified in your `.env` file).

---

## 📁 Project Structure

The project is organized as follows:

```
e-commerce-repo/
├── config/             # Configuration files (e.g., database)
│   └── config.json
├── controllers/        # Express route controllers
│   └── controller.js
├── models/             # Sequelize models
│   ├── index.js
├── routes/             # Express route definitions
│   └── index.js
├── .env                # Environment variables
├── app.js              # Express app initialization
├── package.json
└── README.md
```

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the application in production mode.

### `npm run dev`
Runs the application in development mode with hot-reloading (using `nodemon`).

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

- [Express.js](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)

---
