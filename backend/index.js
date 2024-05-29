import express from 'express'
import * as queries from './queries.js'
const app = express()
import cors from 'cors'
app.use(cors())
const port = 5000
import sqlite3 from "sqlite3"
//import PokeData from "../src/components/PokemonPage/index.js"
const db = new sqlite3.Database('../database/pokemon')

let evolutionChain = {
    evolutions: [{
        id: null,
        name: null,
        method: null,
        type1: null,
        type2: null,
        img: null,
        evolvesTo: []
    }]
}
let pokeData = {
    pokemonId: null,
    name: null,
    description: null,
    bigImage: null,
    localId: [{
        pokedex: null,
        id: null
    }],
    type1: null,
    type2: null,
    species: null,
    heightM: null,
    weightKg: null,
    maleRatio: null,
    femaleRatio: null,
    baseFriendship: null,
    special: null,
    typeEffectiveness: [{
        typeAttacking: null,
        AtMulti: null,
        DefMulti: null
    }],
    evolutionChain: null,
    entries: [{
        entry: null,
        games: null
    }],
    moveset: [{
        gameFamily: [{
            name: null,
            moves: [{
                number: null,
                moveName: null,
                type: null,
                category: null,
                power: null,
                accuracy: null
            }]
        }]
    }],
    sprites: [{
        gen: null,
        normal: null,
        shiny: null
    }],
    locations: [{
        games: null,
        location: [{
            region: null,
            locationName: null
        }]
    }],
    previousPoke: {
        id: null,
        name: null
    },
    nextPoke: {
        id: null,
        name: null
    }
}

//const pokedata=require('../src/components/PokemonPage/index.tsx')
app.get('/api/pokemon', (req, res) => {
    res.send('Hello  world1!')
})
//bez api bo nie działało todo: naprawić może
app.get('/pokemon/:name', (req, res) => {
    const pokeName=[req.params.name].toString()
    pokeData.name=pokeName
    console.log(pokeName)
    let pokemonId= 0

    db.get(queries.query_getIdFromName(pokeName), (err, rows)=>{
        pokemonId=rows.pokeId
        pokeData.pokemonId=pokemonId
        //console.log(pokemonId)

        db.get(queries.query_getBasicPokemonData(pokemonId),  (err, rows) => {
            res.send(pokemonId.toString()+' '+rows.species.toString())
            pokeData.description=rows.description
            pokeData.species=rows.species
            pokeData.heightM=rows.height
            pokeData.weightKg=rows.weight
            pokeData.maleRatio=rows.maleRatio
            pokeData.femaleRatio=rows.femaleRatio
            rows.baseFriendship? pokeData.baseFriendship=rows.baseFriendship : '' //todo: handle null base friendship
            pokeData.species=rows.species
            pokeData.special=rows.special
            db.get(queries.query_getTypesOfPokemon(pokemonId), (err, rows)=>{
                pokeData.type1=rows.type1
                if(rows.type2)
                    pokeData.type2=rows.type2

                db.all(queries.query_getInGamePokemonIds(pokemonId), (err, rows)=>{
                    rows.forEach(function (row){
                        console.log(row.localPokedexNumber, row.description)
                        pokeData.localId.push({
                            pokedex: row.description,
                            id: row.localPokedexNumber
                        })
                        pokeData.localId = pokeData.localId.filter(item => item.pokedex !== null && item.id !== null)
                    })
                    console.log(pokeData)
                })
            })

        })
    })



})

app.get('/api', (req, res) => {
    res.send('Hello  world!')
})

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`)
})

