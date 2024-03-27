const express = require('express');
const app = express();
const port = 5000;

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'Hello  world!' });
});

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
