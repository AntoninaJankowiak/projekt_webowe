const axios=require('axios')
const cheerio=require('cheerio')
const sqlite3=require('sqlite3').verbose()
const db=new sqlite3.Database('../pokewiki/database/pokemon')
async function fetchHTML(url) {
        const {data}=await axios.get(url)
        return cheerio.load(data)
}
let lastLevel=0
function insertData(db, pokemonId, moveId, levelLearnt, pokedexId){
    if (!isNaN(levelLearnt)){
        //if(moveId===378)
            //console.log(`handling sleep powder`)
        const query=`INSERT INTO pokemon_learn_move (pokemon, move, levelLearnt, pokedexId) VALUES (?, ?, ?, ?)`
        db.run(query, [pokemonId, moveId, levelLearnt, pokedexId], (err) => {
            if (err)
                console.error('Error inserting data:', err.message)
            //else
               // console.log('Data inserted successfully.')
        })
    }
    else
        print("problem in insert data")
    lastLevel=levelLearnt
}

function getPokemonNameAndId(pokemonId){
    return new Promise((resolve, reject)=>{
        const query=`SELECT global_id, name FROM pokemon_national WHERE global_id=?`
        db.get(query, [pokemonId], (err, row) => {
            if (err) reject(err)
            else resolve(row)
        })
    })
}
async function scrapeAllPokemonMoves(start, end, edition, editionId) {
    const baseUrl='https://pokemondb.net/pokedex/'

    const db=new sqlite3.Database('../pokewiki/database/pokemon')

    for (let i=start;i<=end;i++) {
        const {global_id, name}=await getPokemonNameAndId(i)
        const pokemonUrl=name.toLowerCase().replace('♀', '-f').replace('♂', '-m').replace("'", "").replace('. ','-')

        const url=`${baseUrl}${pokemonUrl}/moves/2`
        const $=await fetchHTML(url)
        const pokemonId=global_id

        //replaced hardcoded "Red" edition with variable from terminal
        //const paragraph=$(`p:contains("levels"):contains("Red")`)
        const paragraph=$(`p:contains("levels"):contains("${edition}")`)
        console.log(paragraph.text())
        const table=paragraph.next('div.resp-scroll').find('table')

        if (paragraph.parent().html()===table.parent().parent().html()){
            table.find('tbody tr').each((index, element) => {
            const $row=$(element)

            if ($row.find('td.cell-num').first().hasClass('cell-num')) {
                const levelLearnt=parseInt($row.find('td:first-child').text())
                const moveName=$row.find('td.cell-name a').text().trim()
                const move1 = moveName.replace(/[\s-]/g, '')
                const moveIdQuery=`SELECT id FROM moves WHERE TRIM(REPLACE(REPLACE(name, ' ', ''), '-', '')) = ?`

                db.get(moveIdQuery, [move1], (err, row) => {
                    if (!err) {
                        if (row) {
                            const moveId=row.id
                            insertData(db, pokemonId, moveId, levelLearnt, editionId)
                            //console.log(`Id: ${moveId} Move: ${moveName}, Inserted: true`)
                        }
                    }
                })
            }
        })
        }
    }
    db.close()
}

const start = parseInt(process.argv[2])
const end = parseInt(process.argv[3])
//const edition = parseInt(process.argv[3]) //this is Red or Blue(1), Yellow(2), Gold or Silver(3), Crystal(4)
const edition="Crystal"
const editionId= 4

scrapeAllPokemonMoves(start,end,edition, editionId)
