import axios from 'axios'
import cheerio from 'cheerio'
async function scrapePokemonEntries() {
    const pokemonEntries = []

    let currentPokemon = 'chikorita' //start from
    const urlBase = 'https://pokemondb.net/pokedex/'

    for (let id = 152; id <= 251; id++) {
        const url = urlBase + currentPokemon
        try {
            const response = await axios.get(url)
            const $ = cheerio.load(response.data)

            const pokemonName = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1)
            const entriesTable = $('h2:contains("Pokédex entries")').next('.resp-scroll').find('table.vitals-table')

            entriesTable.find('tr').each((index, element) => {
                const games = $(element).find('th span').map((i, el) => $(el).text().toLowerCase().trim()).get()
                const description = $(element).find('td').text().trim()

                games.forEach(game => {
                    let gameId;
                    switch (game) {
                        case 'red':
                            gameId = 1
                            break
                        case 'blue':
                            gameId = 2
                            break
                        case 'yellow':
                            gameId = 3
                            break
                        case 'gold':
                            gameId = 4
                            break
                        case 'silver':
                            gameId = 5
                            break
                        case 'crystal':
                            gameId = 6
                            break
                        default:
                            gameId = 0
                    }
                    if (gameId !== 0) {
                        pokemonEntries.push(`${id},${gameId},'${description}'`)
                    }
                })
            })


            const nextPokemonUrl = $('.entity-nav-next').attr('href')
            currentPokemon = nextPokemonUrl.split('/')[2]
        } catch (error) {
            console.error(`Error scraping data for ${currentPokemon}: ${error}`)
        }
    }

    // Print the scraped entries
    pokemonEntries.forEach(entry => console.log(entry))
}

scrapePokemonEntries()
