import express from 'express'
import * as queries from './queries.js'
const app = express()
import cors from 'cors'
app.use(cors())
const port = 5000
import sqlite3 from "sqlite3"
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
        typeEnemy: null,
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
            //res.send(pokemonId.toString()+' '+rows.species.toString())
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
                        pokeData.localId.push({
                            pokedex: row.description,
                            id: row.localPokedexNumber
                        })
                        pokeData.localId = pokeData.localId.filter(item => item.pokedex !== null && item.id !== null)
                    })

                    //console.log(pokeData)
                    db.all(queries.query_getTypeDefenses(pokemonId, (pokeData.type2? 2: 1)),(err,rows)=>{
                        rows.forEach(function (row){
                            pokeData.typeEffectiveness.push({
                                typeEnemy: row.attack_type,
                                DefMulti: row.multi,
                                AtMulti: null
                            })
                        })
                        pokeData.typeEffectiveness = pokeData.typeEffectiveness.filter(i => i.typeEnemy&&i.DefMulti)
                        db.all(queries.query_getTypeAttacks(pokemonId, (pokeData.type2? 2: 1)),(err,rows)=> {
                            rows.forEach(function (row) {
                                let index = row.defense_type - 1
                                pokeData.typeEffectiveness[index].AtMulti = row.multi //TODO: CHECK IF WORKS FOR 2 TYPE POKEMON
                            })
                            db.all(queries.query_getPokedexEntries(pokemonId),(err,rows)=>{
                                rows.forEach(function(row){
                                    pokeData.entries.push({
                                        entry: row.entry,
                                        games: row.game
                                    })
                                })
                                //todo: merge same ones

                                for(let i=1; i<pokeData.entries.length; i++){
                                    if(pokeData.entries[i-1]){
                                        if (pokeData.entries[i].entry===pokeData.entries[i-1].entry){
                                            pokeData.entries[i-1].games+=', '+ pokeData.entries[i].games
                                            pokeData.entries.splice(i,1)
                                        }
                                    }
                                }
                                pokeData.entries = pokeData.entries.filter(i => i.entry&&i.games)
                                db.all(queries.query_getPreviousAndNextPokemon(pokemonId), (err,rows)=>{
                                    console.log(rows[0])
                                    if(rows[0].type==="prev"){
                                        pokeData.previousPoke.id=rows[0].global_id
                                        pokeData.previousPoke.name=rows[0].name
                                    }
                                    else{
                                        pokeData.nextPoke.id=rows[0].global_id
                                        pokeData.nextPoke.name=rows[0].name
                                    }
                                    if(rows[1].type){ //zabezpieczenia przed ostatnim i pierwszym pokemonem, chyba działa
                                        pokeData.nextPoke.id=rows[1].global_id
                                        pokeData.nextPoke.name=rows[1].name
                                    }

                                    db.all(queries.query_getSpritesForEachGen(pokemonId), (err, rows)=>{
                                        rows.forEach(function (row){
                                            pokeData.sprites.push({
                                                gen: row.generation,
                                                normal: row.sprite,
                                                shiny: row.sprite_shiny?row.sprite_shiny:null
                                            })
                                        })
                                        pokeData.sprites = pokeData.sprites.filter(i => i.gen&&i.normal)
                                        //todo: locations optional: moveset, evolution chain
                                        //res.json(pokeData)
                                        console.log(pokeData)
                                    })
                                })
                            })
                        })
                    })
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

