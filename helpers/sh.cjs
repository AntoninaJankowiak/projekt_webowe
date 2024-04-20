const axios=require('axios')
const fs=require('fs')
const path=require('path')
const cheerio=require('cheerio')
const sqlite3=require('sqlite3').verbose()

async function downloadImage(url,folder,filename){
    const imagePath=path.join(folder,filename)
    const writer=fs.createWriteStream(imagePath)

    const response=await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve,reject)=>{
        writer.on('finish',resolve)
        writer.on('error',reject)
    })
}

function getPokemonNameAndId(pokemonId,db) {
    return new Promise((resolve,reject)=>{
        const query=`SELECT name FROM pokemon_national WHERE global_id=?`
        db.get(query,[pokemonId],(err,row)=>{
            if (err)
                reject(err)
            else{
                if (row)
                    row.name=row.name.toLowerCase().replace('♀','-f').replace('♂','-m').replace("'","").replace('. ','-').replace("é","e")
                if(pokemonId===439)
                    row.name="mime-jr"
                if(pokemonId===669)
                    row.name="flabebe"
                resolve(row)
            }
        })
    })
}

async function downloadPokemonImages(start,end){
    const baseURL='https://img.pokemondb.net/sprites/home/normal/2x/'
    //const imageFolder='/home/aleks/Documents/images/bigsh'
    const imageFolder='/home/aleks/Documents/images/big'
    const db=new sqlite3.Database('../pokewiki/database/pokemon')

    for (let id=start; id <= end; id++){
        const pokemon=await getPokemonNameAndId(id,db)
        if (pokemon){
            const url=`${baseURL}${pokemon.name}.jpg`
            //const imageName=`${pokemon.name}BigSh.jpg`
            const imageName=`${pokemon.name}Big.jpg`
            await downloadImage(url,imageFolder,imageName)
            console.log(`Downloaded image for ${pokemon.name}`)
        }

    }
    db.close()
}

downloadPokemonImages(601,721)
