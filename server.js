const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./models');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/borrowings', borrowingRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Serveur de la bibliothèque opérationnel!');
});

const PORT = process.env.PORT || 3000;

// Database connection & Server start
db.sync({ alter: true }) // Sync models (alter: true updates tables if they exist)
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });
