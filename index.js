const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());



const whitelist = ['http://localhost:3000', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.use(express.static(__dirname));
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.listen(port, () => {
  console.log("IP 192.168.0.108 escuchando en puerto: " + port);
});

