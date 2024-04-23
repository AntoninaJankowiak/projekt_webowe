const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')

function formatLocationName(name) {
    let words = name.split('-');
    if (words.length > 1 && !words[1].startsWith('route')) {
        words.shift(); // Remove 'kanto' part
    }
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

async function scrapeLocations() {
    const url = 'https://pokemondb.net/location#loc-kanto'
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    const links = $('a[href^="/location/kanto"]')
    let locations = ''

    links.each((index, element) => {
        const href = $(element).attr('href')
        const text = formatLocationName($(element).text())
        locations += `${href}, ${text}\n`
    });

    fs.writeFileSync('locations.txt', locations)
}

scrapeLocations()