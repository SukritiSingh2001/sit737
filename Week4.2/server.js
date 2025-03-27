/** * Basic Calculator Microservice * 

  Basic arithmetic functions such as addition, subtraction, * multiplication, division, modulo, exponentiation, and square root are provided by this microservice.  It's implemented * with Express and Node.js. *  Directions: * 
  1. Verify that Node.js is installed on your computer.  
  2. Go to the newly created project folder.
  3. Initialize a new Node.js project by running `npm init -y`.
  4. npm install express` may be used to install Express.
  5. Copy and store this code in a `server.js` file.
  6. node server.js` is used to start the server.
  7. Use an API testing tool (like Postman) or a web browser to access the endpoints.
  */



const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * @route GET /add
 * @desc Adds two numbers
 * @query {number} a - First number
 * @query {number} b - Second number
 * @returns {object} { result: number }
 */
app.get('/add', (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) return res.status(400).json({ error: 'Missing parameters' });
    res.json({ result: parseFloat(a) + parseFloat(b) });
});

/**
 * @route GET /subtract
 * @desc Subtracts two numbers
 */
app.get('/subtract', (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) return res.status(400).json({ error: 'Missing parameters' });
    res.json({ result: parseFloat(a) - parseFloat(b) });
});

/**
 * @route GET /multiply
 * @desc Multiplies two numbers
 */
app.get('/multiply', (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) return res.status(400).json({ error: 'Missing parameters' });
    res.json({ result: parseFloat(a) * parseFloat(b) });
});

/**
 * @route GET /divide
 * @desc Divides two numbers
 */
app.get('/divide', (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) return res.status(400).json({ error: 'Missing parameters' });
    if (parseFloat(b) === 0) return res.status(400).json({ error: 'Cannot divide by zero' });
    res.json({ result: parseFloat(a) / parseFloat(b) });
});

/**
 * @route GET /modulo
 * @desc Finds the remainder of division
 */
app.get('/modulo', (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) return res.status(400).json({ error: 'Missing parameters' });
    res.json({ result: parseFloat(a) % parseFloat(b) });
});

/**
 * @route GET /exponent
 * @desc Calculates a^b
 */
app.get('/exponent', (req, res) => {
    const { a, b } = req.query;
    if (!a || !b) return res.status(400).json({ error: 'Missing parameters' });
    res.json({ result: Math.pow(parseFloat(a), parseFloat(b)) });
});

/**
 * @route GET /sqrt
 * @desc Calculates the square root
 */
app.get('/sqrt', (req, res) => {
    const { a } = req.query;
    if (!a) return res.status(400).json({ error: 'Missing parameter' });
    if (parseFloat(a) < 0) return res.status(400).json({ error: 'Cannot calculate square root of negative number' });
    res.json({ result: Math.sqrt(parseFloat(a)) });
});

// Error Handling for Invalid Routes
app.use((req, res) => {
    res.status(404).json({ error: 'Invalid endpoint' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Calculator microservice running on port ${PORT}`);
});
