const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 9000

app.use(express.static(__dirname))

app.get(/\.(jpg|png|svg)$/, (req, res) => {
  console.log('\x1b[36mi\x1b[0m image requested, url: ' + req.url)
  res.sendFile(path.join(__dirname, 'dist', req.url))
})

app.get(/\.js$/, (req, res) => {
  console.log('\x1b[36mi\x1b[0m script requested, url: ' + req.url)
  res.sendFile(path.join(__dirname, 'dist', req.url))
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`\x1b[36mi\x1b[0m \x1b[1mDashApp\x1b[0m is listening on port ${port}`)
})
