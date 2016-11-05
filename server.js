let express = require('express');
let app = express();

app.use('/', express.static('.'));
app.listen(8000, function() {
    console.log('listening on port 8000');
});