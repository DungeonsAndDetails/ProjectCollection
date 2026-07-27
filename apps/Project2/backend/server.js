const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', project: 'project2-backend' });
});

app.listen(PORT, () => {
  console.log(`Project2 backend listening on port ${PORT}`);
});
