const express = require('express')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = 3000

const db = new sqlite3.Database('../database/pokemon')

app.get('/image1/:pokemonId', (req, res) => {
    const pokemonId = req.params.pokemonId
    db.get('SELECT sprite FROM pokemon_sprite WHERE pokemon_id = ? AND generation = 1', [pokemonId], (err, row) => {
        res.type('image/png').send(Buffer.from(row.sprite, 'hex'))
    })
})

app.get('/image2/:pokemonId', (req, res) => {
    const pokemonId = req.params.pokemonId
    db.get('SELECT sprite FROM pokemon_sprite WHERE pokemon_id = ? AND generation = 2', [pokemonId], (err, row) => {
        res.type('image/png').send(Buffer.from(row.sprite, 'hex'))
    })
})

app.get('/image3/:pokemonId', (req, res) => {
    const pokemonId = req.params.pokemonId
    db.get('SELECT sprite FROM pokemon_sprite WHERE pokemon_id = ? AND generation IS NULL', [pokemonId], (err, row) => {
        res.type('image/jpg').send(Buffer.from(row.sprite, 'hex'))
    })
})


app.get('/image2sh/:pokemonId', (req, res) => {
    const pokemonId = req.params.pokemonId
    db.get('SELECT sprite_shiny FROM pokemon_sprite WHERE pokemon_id = ?', [pokemonId], (err, row) => {
        res.type('image/png').send(Buffer.from(row.sprite, 'hex'))
    })
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
