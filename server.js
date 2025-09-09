require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser');
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const {createUser} = require('./models/User');
const pool = require('./db/db');

console.log(process.env.NODE_ENV);

(async () => {
    const usercreation = await createUser('reedrichards', 'reedrichards@gmail.com', 'something');
    console.log(usercreation);
    const result = await pool.query('SELECT * FROM users');
    console.log(result.rows);
})();

app.use(logger);

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'));



app.all(/.*/, (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')) {
        res.json({message: '404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found');
    }
})

app.use(errorHandler);

app.listen(PORT, () => console.log(`server running on port ${PORT}`));