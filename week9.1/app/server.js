const express = require('express');
const mongoose = require('mongoose');
const itemRoutes = require('./routes/items');

const app = express();
app.use(express.json());

const user = process.env.DB_USER || 'mongouser';
const pass = process.env.DB_PASS || 'password';
const host = process.env.DB_HOST || 'localhost';
const uri = `mongodb://${user}:${pass}@${host}:27017/?authSource=admin`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.use('/items', itemRoutes);

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
