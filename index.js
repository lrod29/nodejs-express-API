const express = require('express');
const cors = require('cors');
const routerApi = require('./routes/index');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());



const whitelist = ['http://localhost:3000'];
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

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});


app.listen(port, () => {
  console.log("escuchando en puerto: " + port);
});

