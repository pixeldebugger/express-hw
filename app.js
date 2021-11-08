const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {DB_URL, PORT} = require("./configs/configs");
const {SERVER_ERROR} = require("./configs/statusCodes.enum");

const app = express();
mongoose.connect(DB_URL);

const path = require('path');
const staticPath = path.join(__dirname, 'static');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));


//--------------routers start---------------------
const {
    authorRouter,
    postRouter
} = require('./routers');

app.use('/author', authorRouter);
app.use('/post', postRouter);


//-------------routers end-----------------


app.use(_mainErrorHandler);

app.listen(PORT, () => {
    console.log('App listens port', PORT);
});


function _mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            message: err.message || 'Unknown error'
        });
}
