import sqlite3 from 'sqlite3';
import fs from 'fs';
import * as func from './functions.js'
const db = new sqlite3.Database('database/pokemon')
const table = 'pokemon_sprite'
const dir = '../images'
const dir1= '../images/big'
const dir2= '../images/bigsh'
function readFileAsBuffer(filePath){
    return fs.readFileSync(filePath)
}

for (let pokemonId= 501; pokemonId <= 721; pokemonId++){
    const nameQuery = `SELECT LOWER(name) FROM pokemon_national WHERE global_id = ?`
    db.get(nameQuery, [pokemonId], (err, row) => {
        if(err) console.error('Error querying Pokémon name:', err)

        let pokemonName = row['LOWER(name)']
        pokemonName=func.fixNamesFromDb(pokemonName)

        //const spriteGen1 = `${dir}/${pokemonName}1.png`
        //const spriteGen2 = `${dir}/${pokemonName}2.png`
        //const shSpriteGen2 = `${dir}/${pokemonName}2sh.png`
        const bigSprite = `${dir1}/${pokemonName}Big.jpg`
        const bigSpriteSh = `${dir2}/${pokemonName}BigSh.jpg`
        {
        //gen 1 only
        /*if (fs.existsSync(spriteGen1)) {
            const spriteData1 = readFileAsBuffer(spriteGen1)
            const insertQuery1 = `INSERT INTO ${table} (pokemonId, generation, sprite) VALUES (?, ?, ?)`
            db.run(insertQuery1, [pokemonId, 1, spriteData1], (err) => {
                if(err)
                    console.error('Error inserting normal sprite for generation 1:', err)
            })
        }*/

        //gen 2
        /*if (fs.existsSync(spriteGen2) && fs.existsSync(shSpriteGen2)) {
            const spriteData2 = readFileAsBuffer(spriteGen2)
            const spriteData2sh = readFileAsBuffer(shSpriteGen2)
            const insertQuery2 = `INSERT INTO ${table} (pokemonId, generation, sprite, sprite_shiny) VALUES (?, ?, ?, ?)`
            db.run(insertQuery2, [pokemonId, 2, spriteData2, spriteData2sh], (err) => {
                if(err)
                    console.error('Error inserting sprites for generation 2:', err)
            })
        } */
        //big images 252 to 721, big sh 1 to 721
        //big jpg images

        }
        if (fs.existsSync(bigSprite)){
           console.log(pokemonName)
           const bigSpriteData = readFileAsBuffer(bigSprite)
           const bigSpriteDataSh=readFileAsBuffer(bigSpriteSh)
           const insertQueryB = `INSERT INTO ${table} (pokemon_id, sprite, sprite_shiny) VALUES (?, ?, ?)`
           db.run(insertQueryB, [pokemonId, bigSpriteData, bigSpriteDataSh], (err) => {
               if(err) console.error('Error inserting sprite', err)
           })
       }
        else console.log("not found"+pokemonName)
    })
}

db.close()
