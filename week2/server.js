const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static HTML file
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
