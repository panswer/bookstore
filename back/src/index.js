const app = require('./server');
require('./script');

app.listen(process.env.SERVER_PORT, err =>
    err ?
        console.log(err) :
        console.log(`Server on port ${process.env.SERVER_PORT}`));