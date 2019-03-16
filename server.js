const express = require('express')
const bodyParser = require('body-parser')
const createReport = require('docx-templates')
const toPdf = require('office-to-pdf')

const app = express()

// POST parsing
app.use(bodyParser.json({limit: '50mb'}))

// CORS support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/docx/pdf', (req, res) => {
  createReport({
    template: Buffer.from(req.body.file, 'base64'),
    output: 'buffer',
    data: req.body.data || {},
  })
    .then(buffer => {
      toPdf(buffer)
        .then(buffer => {
          res.json({
            status: 'ok',
            file: buffer.toString('base64')
          })
        })
        .catch(err => {
          res.json({
            status: 'error',
            errors: ['' + err]
          })
        })
    })
    .catch(err => {
      res.json({
        status: 'error',
        errors: ['' + err]
      })
    })
})

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
})

app.listen(80)
