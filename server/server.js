var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: storage })

app.use(express.static(path.join(__dirname, '/public')));

app.set('port', process.env.PORT || 3005);

app.post('/uploadFile', upload.single('photo'), function (req, res, next) {
    console.log(req.data);
    return res;
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});