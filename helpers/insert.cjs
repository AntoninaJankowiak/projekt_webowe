const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const db = new sqlite3.Database('../database/pokemon')
const TABLE = 'pokemon_sprite'
const DIRECTORY = '../../images'
const dir1= '../../images/big'
function readFileAsBuffer(filePath) {
    return fs.readFileSync(filePath)
}

for (let POKEMON_ID = 13; POKEMON_ID <= 251; POKEMON_ID++) {
    const POKEMON_NAME_QUERY = `SELECT LOWER(name) FROM pokemon_national WHERE global_id = ?`

    db.get(POKEMON_NAME_QUERY, [POKEMON_ID], (err, row) => {
        if (err) {
            console.error('Error querying Pokémon name:', err)
            return
        }
        if (!row) {
            console.error('Pokémon not found for ID:', POKEMON_ID)
            return
        }
        const POKEMON_NAME = row['LOWER(name)']
        console.log(`Processing Pokemon ID ${POKEMON_ID} with name: ${POKEMON_NAME}`)
        //const NORMAL_SPRITE_FILE_GEN1 = `${DIRECTORY}/${POKEMON_NAME}1.png`
        const NORMAL_SPRITE_FILE_GEN2 = `${DIRECTORY}/${POKEMON_NAME}2.png`
        const SHINY_SPRITE_FILE_GEN2 = `${DIRECTORY}/${POKEMON_NAME}2sh.png`
        const BIG_SPRITE_FILE = `${dir1}/${POKEMON_NAME}Big.jpg`

        //gen 1 only
        /*if (fs.existsSync(NORMAL_SPRITE_FILE_GEN1)) {
            const NORMAL_SPRITE_DATA_GEN1 = readFileAsBuffer(NORMAL_SPRITE_FILE_GEN1)
            const INSERT_QUERY_GEN1 = `INSERT INTO ${TABLE} (pokemon_id, generation, sprite) VALUES (?, ?, ?)`
            db.run(INSERT_QUERY_GEN1, [POKEMON_ID, 1, NORMAL_SPRITE_DATA_GEN1], (err) => {
                if (err) {
                    console.error('Error inserting normal sprite for generation 1:', err)
                }
            })
        }*/

        //gen 2
        /*if (fs.existsSync(NORMAL_SPRITE_FILE_GEN2) && fs.existsSync(SHINY_SPRITE_FILE_GEN2)) {
            const NORMAL_SPRITE_DATA_GEN2 = readFileAsBuffer(NORMAL_SPRITE_FILE_GEN2)
            const SHINY_SPRITE_DATA_GEN2 = readFileAsBuffer(SHINY_SPRITE_FILE_GEN2)
            const INSERT_QUERY_GEN2 = `INSERT INTO ${TABLE} (pokemon_id, generation, sprite, sprite_shiny) VALUES (?, ?, ?, ?)`
            db.run(INSERT_QUERY_GEN2, [POKEMON_ID, 2, NORMAL_SPRITE_DATA_GEN2, SHINY_SPRITE_DATA_GEN2], (err) => {
                if (err) {
                    console.error('Error inserting sprites for generation 2:', err)
                }
            })
        } */

        //big jpg images
        if (fs.existsSync(BIG_SPRITE_FILE)) {
           const BIG_SPRITE_DATA = readFileAsBuffer(BIG_SPRITE_FILE)
           const INSERT_QUERY_BIG = `INSERT INTO ${TABLE} (pokemon_id, sprite) VALUES (?, ?)`
           db.run(INSERT_QUERY_BIG, [POKEMON_ID, BIG_SPRITE_DATA], (err) => {
               if (err) {
                   console.error('Error inserting sprite', err)
               }
           })
       }

    })
}

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err)
    }
})
