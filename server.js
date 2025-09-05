const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // use MongoStore instead of MemoryStore
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// --- Connect to MongoDB and start server ---
(async () => {
  try {
    const db = await connectDB();
    console.log("✅ MongoDB connected successfully");

    // --- Session setup using MongoStore (avoids MemoryStore warning) ---
    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'fallback-secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
      })
    );

    // --- Flash messages middleware ---
    app.use((req, res, next) => {
      res.locals.message = req.session.message || null;
      res.locals.isAuthenticated = !!req.session.userId;
      res.locals.userName = req.session.userName || null;
      delete req.session.message;
      next();
    });

    // --- View engine & static files ---
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use('/public', express.static(path.join(__dirname, 'public')));

    // --- Body parser ---
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // --- Routes ---
    app.use('/', authRoutes);
    app.use('/', profileRoutes);
    app.use('/', dashboardRoutes);

    // --- 404 fallback ---
    app.use((req, res) =>
      res.status(404).send('❌ 404 Not Found - The page you are looking for does not exist')
    );

    // --- Start server with Railway dynamic PORT ---
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop app if DB fails
  }
})();
