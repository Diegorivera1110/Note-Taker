const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');

module.exports = (app) => {
    
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'));
    });

    app.post('/api/notes', (req, res) => {
        let data = fs.readFileSync('db/db.json');
        data = JSON.parse(data);
        res.json(data);

        let note = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid(),
        };

        data.push(note);
        fs.writeFileSync('db/db.json', JSON.stringify(data));
        res.json(data);
    });
};