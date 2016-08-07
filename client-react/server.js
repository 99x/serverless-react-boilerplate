var express = require('express');
var app = express();

app.use(express.static('public'));
app.listen(3000, function () {
    console.log('Server is up on port 3000');
});
