const express = require('express');
const path = require('path');

const app = express();

// 开发 public 的静态资源
app.use('/public/', express.static(path.join(__dirname) + './public/'));

app.get('/', (req, res) => {
  const data = {
    code: 0,
    message: 'Success',
    data: {}
  }
  res.status(200).json(data)
})

app.listen('3000', () => {
  console.dir('server run on prot localhost://3000');
})
