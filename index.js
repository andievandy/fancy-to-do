const express = require('express');
const app = express();
const port = 3000;
const mainRouter = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', mainRouter);

app.listen(port, () => console.log(`Todo application listening on port ${port}`));