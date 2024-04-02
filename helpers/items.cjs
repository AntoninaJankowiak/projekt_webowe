const axios = require('axios');
const cheerio = require('cheerio');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../database/pokemon')

//code is too fast and brakes the queries lmao
function sleep(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
}

function scrapeItems() {
        let deletedItems= 0;
        db.all(`SELECT name FROM items`, async (err, rows) => {
            for (const row of rows) {
                const itemName = row.name;
                const itemId = row.id;
                const normalizedItemName = itemName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const url = `https://pokemondb.net/item/${encodeURIComponent(normalizedItemName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''))}`;

                const response = await axios.get(url);
                    const html = response.data;
                    const $ = cheerio.load(html);
                    const emeraldExists = $('th').find('span.igame.emerald').length > 0;
                    if (!emeraldExists){
                        db.get(`SELECT id FROM items WHERE name = ?`, [itemName], (err, row) => {
                            if (row) {
                                const itemId = row.id;
                                db.run(`DELETE FROM items WHERE id = ?`, [itemId]);
                                db.run(`UPDATE items SET id = id - 1 WHERE id > ?`, [itemId]);
                                deletedItems++
                                console.log("deleted "+itemName+ " "+itemId)
                                sleep(100);
                            }
                        });
                    }
                    else
                        console.log(`${itemName} - good`);
            }
            console.log(deletedItems)
        });
}

scrapeItems();
