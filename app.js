const express = require('express')
const path = require('path')
const app = express()

const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, 'dist')))

const time = () => {
  const date = new Date()
  return `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
}

app.get(/\.(jpg|png|svg|mp(3|4))$/, (req, res) => {
  console.log(time() + ' \x1b[36mi\x1b[0m file requested, url: ' + req.url)
  res.sendFile(path.join(__dirname, 'dist', req.url))
})

app.get(/\.js$/, (req, res) => {
  console.log(time() + ' \x1b[36mi\x1b[0m script requested, url: ' + req.url)
  res.sendFile(path.join(__dirname, 'dist', req.url))
})

app.get('/*', (req, res) => {
  console.log(time() + ' \x1b[36mi\x1b[0m index requested, url: ' + req.url)
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(time() + ` \x1b[36mi\x1b[0m \x1b[1mDashApp\x1b[0m is listening on port ${port}`)
})
