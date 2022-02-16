// const apiRouter = require('./routes/routes').router;

const express = require('express')
const app = express()
const port = 3000
const db = require('./db')
const cors = require('cors')
const userCtrl = require('./controllers/userCtrl')
var bodyParser = require('body-parser')
const { urlencoded } = require('express')

let database = db.db()

database.close()

app.use(cors())

app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/users/signup', (req, res) => {
    let result = userCtrl.signup(req, res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})