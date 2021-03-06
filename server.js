const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log('MONGODB has ben connected'))
    .catch((err) => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(cors());

readdirSync('./routes').map((r) =>
    app.use('/api', require(`./routes/${r}`))
);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
