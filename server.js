const express = require('express');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});