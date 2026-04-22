// backend/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const affiliateRoutes = require('./routes/affiliates');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/affiliates', affiliateRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'NexusHub API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
