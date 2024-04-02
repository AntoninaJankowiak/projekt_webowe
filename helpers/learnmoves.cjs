const axios = require('axios');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../pokewiki/database/pokemon')
async function fetchHTML(url) {
    try {
        const { data } = await axios.get(url);
        return cheerio.load(data);
    } catch (error) {
        console.error(`Error fetching ${url}: ${error}`);
    }
}
let lastlevel;
function insertData(db, pokemonId, moveId, levelLearnt, pokedexId) {
    //console.log("would insert data")

    if (!isNaN(levelLearnt) && lastlevel<levelLearnt) {
        const query = `INSERT INTO pokemon_learn_move (pokemon, move, levelLearnt, pokedexId) VALUES (?, ?, ?, ?)`;
        db.run(query, [pokemonId, moveId, levelLearnt, pokedexId], (err) => {
            if (err)
                console.error('Error inserting data:', err.message);
            else
                console.log('Data inserted successfully.');
        });
    }
    lastlevel=levelLearnt;
}

function getPokemonNameAndId(pokemonId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT global_id, name FROM pokemon_national WHERE global_id = ?`;
        db.get(query, [pokemonId], (err, row) => {
            if (err)
                reject(err);
            else
                resolve(row);
        });
    });
}
async function scrapeAllPokemonMoves() {
    const baseUrl = 'https://pokemondb.net/pokedex/';

    const db = new sqlite3.Database('../pokewiki/database/pokemon');

    //change it to 151 later
    for (let i = 12; i <= 12; i++) {
        const { global_id, name } = await getPokemonNameAndId(i);
        const pokemonUrl = name.toLowerCase().replace('♀', '-f').replace('♂', '-m');

        const url = `${baseUrl}${pokemonUrl}/moves/1`;
        const $ = await fetchHTML(url);
        const pokemonId = global_id;

        const paragraph = $(`p:contains("levels"):contains("Red")`);


        const table = paragraph.next('div.resp-scroll').find('table');
        //if (paragraph.parent().html() === table.parent().parent().html())
            //console.log('Paragraph and table have the same parent element.');


        if (paragraph.parent().html() === table.parent().parent().html()){
        if (paragraph.text().length > 0) {
            //const table = paragraph.nextAll('table').first();
            const tableDiv = $('div.resp-scroll');
            const table = tableDiv.find('table');
            table.find('tbody tr').each((index, element) => {
                //console.log("here1")
            const $row = $(element);

            if ($row.find('td.cell-num').first().hasClass('cell-num')) {
                //console.log("in the if2 statement");
                //const levelLearnt = parseInt($row.find('td.cell-num').eq(0).text());
                const levelLearnt = parseInt($row.find('td:first-child').text());
                const moveName = $row.find('td.cell-name a').text().trim();
                const moveIdQuery = `SELECT id FROM moves WHERE name = ?`;
                db.get(moveIdQuery, [moveName], (err, row) => {
                    if (err)
                        console.error('Error getting move ID:', err.message);
                    else {
                        if (row) {
                            const moveId = row.id;
                            insertData(db, pokemonId, moveId, levelLearnt, 1);
                        }
                    }
                });
            }

        });
        }
        }
    }
    db.close();
}

scrapeAllPokemonMoves();
