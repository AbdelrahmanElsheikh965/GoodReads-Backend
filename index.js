/* eslint-disable import/no-unresolved */
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const routes = require('./routers');
const cors = require('cors');

dotenv.config({ path: './config.env' });
const app = express();
app.use(cors());


const PORT = process.env.PORT || 3000;

// DB CONNECTION
mongoose
  .connect(process.env.DB_LOCAL)
  .then(() => console.log('the connection done with database'));

// MIDDLEWARE TO USE req.body
app.use(express.json());
app.use(helmet());

// ROUTES
app.use(routes);

app.use("*", (req, res) => {
  res.status(404).json({ Error: "Error 404 not found" });
});

app.listen(PORT, () => {
  console.log(`the server running on port ${PORT}`);
});
