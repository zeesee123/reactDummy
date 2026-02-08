const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
let authRoutes;
try {
  authRoutes = require('./routes/auth');
  console.log('Auth routes loaded');
} catch (err) {
  console.error('Failed to load auth routes:', err.message);
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
