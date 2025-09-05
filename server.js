const path = require('path');
const express = require('express');
const session = require('express-session');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/users');       // profile routes
const dashboardRoutes = require('./routes/dashboard'); // dashboard routes

const app = express();

// --- Connect to MongoDB ---
connectDB();

// --- View engine & static files ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// --- Body parser ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- Session setup ---
app.use(
  session({
    secret: 'devsecret-change-this',
    resave: false,
    saveUninitialized: false,
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

// --- Routes ---
app.use('/', authRoutes);        // login/signup
app.use('/', profileRoutes);     // profile filling
app.use('/', dashboardRoutes);   // dashboard + edit/update/delete

// --- 404 fallback ---
app.use((req, res) => res.status(404).send('404 Not Found'));

// --- Start server ---
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at port ${PORT}`);
});
