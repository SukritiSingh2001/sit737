const express = require('express');
const winston = require('winston');

const app = express();
const port = 3000;

// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Helper function to log the operations
function logOperation(operation, num1, num2) {
  logger.log({
    level: 'info',
    message: `New ${operation} operation requested: ${num1} ${operation} ${num2}`,
  });
}

// API Endpoints for calculator operations

// Addition
app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.log({ level: 'error', message: 'Invalid input numbers for addition' });
    return res.status(400).send('Invalid input numbers');
  }
  const result = parseFloat(num1) + parseFloat(num2);
  logOperation('addition', num1, num2);
  res.send(`Result: ${result}`);
});

// Subtraction
app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.log({ level: 'error', message: 'Invalid input numbers for subtraction' });
    return res.status(400).send('Invalid input numbers');
  }
  const result = parseFloat(num1) - parseFloat(num2);
  logOperation('subtraction', num1, num2);
  res.send(`Result: ${result}`);
});

// Multiplication
app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.log({ level: 'error', message: 'Invalid input numbers for multiplication' });
    return res.status(400).send('Invalid input numbers');
  }
  const result = parseFloat(num1) * parseFloat(num2);
  logOperation('multiplication', num1, num2);
  res.send(`Result: ${result}`);
});

// Division
app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;
  if (isNaN(num1) || isNaN(num2)) {
    logger.log({ level: 'error', message: 'Invalid input numbers for division' });
    return res.status(400).send('Invalid input numbers');
  }
  if (parseFloat(num2) === 0) {
    logger.log({ level: 'error', message: 'Attempt to divide by zero' });
    return res.status(400).send('Cannot divide by zero');
  }
  const result = parseFloat(num1) / parseFloat(num2);
  logOperation('division', num1, num2);
  res.send(`Result: ${result}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Calculator microservice listening at http://localhost:${port}`);
});
