const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/health', (req, res)=>{
  res.status(200).json({
    status: 'ok'
  });
})

// === Routes ====

// ===============

app.use((req, res)=>{
  res.status(404).json({
    message: 'Route not founded'
  });
})


app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Internal server error',
  });
});
 
module.exports = app;