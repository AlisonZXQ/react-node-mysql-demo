const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

const SELECT_ALL_USER_QUERY = 'SELECT * FROM user'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '*',
    database: 'learn'
})

connection.connect(err => {
    if(err) {
        return err;
    }
})

app.use(cors())

app.get('/', (req, res) =>{
    res.send('hello');
})

app.get('/todo/all', (req, res) => {
    connection.query('SELECT * FROM todo', (err, result) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                code: 200,
                message: 'ok',
                data: result
            })
        }
    })
})


app.get('/todo/add', (req, res) => {
    const{ content } = req.query
    const INSERT_TODO_QUERY = `INSERT INTO todo(content) VALUES('${content}')`
    connection.query(INSERT_TODO_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                code: 200,
                message: 'ok',
            })
        }
    })
})


app.listen(4000, () => {
    console.log('running 4000')
})