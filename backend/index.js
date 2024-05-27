import express from 'express'
import * as queries from "./queries.js"
const app = express()
import cors from 'cors'
const port = 5000
app.use(cors())
import sqlite3 from 'sqlite3'
import {query_getNumberOfTypes} from "./queries.js"
const db = new sqlite3.Database('../database/pokemon')
app.use(cors())
app.get('/pokemon/:name', (req, res) => {
    const pokeName=[req.params.name].toString()
    console.log(pokeName)
    let pokemonId= 0

    db.get(queries.query_getIdFromName(pokeName), (err, rows)=>{
        pokemonId=rows.pokeId
        //res.send(pokemonId)
        console.log(pokemonId)
    })

    db.get(queries.query_getNumberOfTypes(parseInt(pokemonId)),  (err, rows) => {
        res.send(pokemonId.toString()+' '+rows.tq.toString())
        console.log(rows.tq.toString())
    })
})

app.get('/', (req, res) => {
    res.send('Hello  world!')
})

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`)
})

