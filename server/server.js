/* eslint-disable import/no-commonjs, no-console */
const fs = require('fs');
const express = require('express');
const app = express();
const { DIR_DEV_ASSETS } = require('../webpackinc/constants');

// Класс Router позволяет определить маршрут, в пределах которого можно создавать подмаршруты и задавать им обработчики
const router = express.Router(); // eslint-disable-line new-cap

router.get('/', (req, res) =>
{
    const path = `${DIR_DEV_ASSETS}/index.html`;

    fs.readFile(path, (err, data) =>
    {
        if (err)
        {
            console.log(err);

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found root!');
        }
        else
        {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());

            console.log('data was sent');

            res.end();
        }
    });
});

router.get('/:id', (req, res) =>
{
    const path = `${DIR_DEV_ASSETS}/${req.params.id}`;

    console.log('path',path);// eslint-disable-line indent, object-curly-spacing,comma-spacing
    fs.readFile(path, (err, data) =>
    {
        if (err)
        {
            console.log(err);

            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found!');
        }
        else
        {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());

            console.log('data was sent');

            res.end();
        }
    });
});

app.use('/', router);

// todo: remove after checking dev deploy
// app.use('/public', express.static('public'));


app.listen(8081, () =>
{
    console.log('Server starting! on http://localhost:8081');
});

