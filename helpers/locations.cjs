const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')


const locations = fs.readFileSync('helpers/locations.txt', 'utf-8').split('\n').map(line => {
    const [id, url] = line.split(', ')
    return { id, url: `https://pokemondb.net${url}` }
})
//const locations = [{ id: 1, url: 'https://pokemondb.net/location/kanto-route-4' }]

const encounterTypes = {
    'Interact': 'i',
    'Walking': 'w',
    'Surfing': 's',
    'Old Rod': 'or',
    'Good Rod': 'gd',
    'Super Rod': 'sr'
}

/*const encounterRates = {
    'C': 'Common',
    'U': 'Uncommon',
    'R': 'Rare',
    'L': 'Limited'
}*/

async function scrapePokemonData() {
    for (const location of locations) {
        console.log(`Scraping ${location.url}`)
        const { data } = await axios.get(location.url)
        const $ = cheerio.load(data)
        const h2Element = $('h2[id^="gen1"]');
        const divElements = h2Element.nextAll('div.resp-scroll')
        const tables = divElements.find('table')
        //console.log(tables.html())
        tables.each(function(_, tableElement) {
            const table = $(tableElement)
            table.find('tr').each(function(_, element) {
                const cells = $(element).find('td')

                const pokemonTitle = cells.eq(0).find('span a.ent-name').attr('title')

                let pokemonId = 0
                if(pokemonTitle)
                    pokemonId = parseInt( pokemonTitle.split(' ')[3].replace('#', ''))
                //console.log(pokemonTitle)
                //const pokemonId = pokemonTitle.split(' ')[3].replace('#', '')

                //const pokemonId = pokemonTitle.match(/#(\d+)/)[1]

                const gameIds = []
                if (cells.eq(1).hasClass('cell-loc-game-R1')) gameIds.push(1)
                if (cells.eq(2).hasClass('cell-loc-game-B1')) gameIds.push(2)

                gameIds.forEach(gameId => {
                    const type = encounterTypes[h2Element.next('h3').text().trim()]
                    const rate = cells.eq(4).find('img.icon-loc').attr('alt').charAt(0).toUpperCase()

                    const levels = cells.eq(5).text().split('-').map(Number)
                    const minLvl = isNaN(levels[0]) ? null : levels[0]
                    const maxLvl = isNaN(levels[1]) ? minLvl : levels[1]

                    const details = cells.eq(6).text().trim() || "NULL"
                    console.log(`${pokemonId}, ${gameId}, ${location.id}, ${type}, ${rate}, ${minLvl}, ${maxLvl}, ${details}`)
                    //pokemon, game, location, encounterType, encounterRate, minLevel, maxLevel
                })
            })
        })
    }
}

scrapePokemonData()