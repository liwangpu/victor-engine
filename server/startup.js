const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fileUpload = require('express-fileupload');

const customComponentRouter = require('./routes/custom-component');

app.use(express.json());
app.use(cors());
app.use(fileUpload({
  createParentPath:'custom-components'
}));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/custom-component', customComponentRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});