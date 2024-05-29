import React from "react"
import './style.scss'
import axios from 'axios'
import Container from "../Container"
import {UniversalNav} from "../GenNav"
import PokeInfoCard from "../PokedexPoke" //will be used soon
import PokeTypeD, {PokeTypeDAll} from "../PokeTypeD"

export interface EvolutionChain {
    evolutions:{
        id: number,
        name: string,
        method: React.ReactNode, //level etc. (react node because it can contain <a>
        type1: string,
        type2?: string,
        img: string
        evolvesTo: EvolutionChain[]
    }[],
}

interface PokeData{
    pokemonId: number,
    name: string,
    description: React.ReactNode,
    bigImage: string,
    localId:{
        pokedex: string,
        id: number
    }[],
    type1: string,
    type2?: string,
    species: string,
    heightM: number,
    weightKg: number,
    maleRatio: number,
    femaleRatio: number,
    baseFriendship: number,
    special?: string, //legendary/mythical...
    typeEffectiveness:{ //only data for newest genc
        typeAttacking:string,
        AtMulti:number, //multiplayer of how strong is THE pokemon against the enemy
        DefMulti: number //multiplayer of how strong enemy is against THE pokemon
    }[]
    evolutionChain?: EvolutionChain //remove the above *evolutions* when this is done
    entries:{
        entry: string,
        games: string[]
    }[],
    moveset?:{
        gameFamily:{ //in db: "description"
            name: string, //(game family name)
                moves:{
                number: number, //if hm or tm then pad, so it's 01 etc. (pad as in pad start with zeroes)
                moveName: string,
                type: string,
                category: string, //special/status/physical
                power: number,
                accuracy: number
                } //moves
        }[] //gameFamily
    }[], //moveset
    sprites:{
        gen: number,
        normal: string,
        shiny?: string,
    }[],
    locations:{
        games: string[],
        location:{
            region?: string, //so link is e.g "kanto-route-6", if null then trade/evolve
            locationName: string //+ trade/evolve
        }[],
    }[],
    previousPoke:{
        id: number,
        name: string,
    },
    nextPoke:{
        id: number,
        name: string,
    }
}
//wiem, dużo danych tu, ale tym sposobem jest najlepiej, jak to rozdzielam to potem jest sporo powtórzeń tego samego

//nav for every pokemon
const navElements=[
    {value: "Info", linkEnd: "#dex-basics"},
    {value: "Evolution Chart", linkEnd: "#dex-evolution"},
    {value: "Pokedex Entries", linkEnd: "#dex-entries"},
    {value: "Moves learned", linkEnd: "#dex-moves"},
    {value: "Sprites", linkEnd: "#dex-sprites"},
    {value: "Locations", linkEnd: "#dex-locations"}
]

export default function PokemonPage({pokeData}:{pokeData:PokeData}) {
    const previous=(pokeData.previousPoke.id).toString().padStart(3, "0")
    const next=(pokeData.nextPoke.id).toString().padStart(3, "0")
    const dexLinks=<div className={"dexLinks"}>
        {pokeData.previousPoke ? <a href={`pokedex/${pokeData.previousPoke.name}`}>	&#9666;	#{previous} {pokeData.previousPoke.name}</a> : ""}
        {pokeData.nextPoke ? <a href={`pokedex/${pokeData.nextPoke.name}`}>#{next} {pokeData.nextPoke.name}	&#9656;</a> : ""}
    </div>

    const heightFreedom: string=Math.floor(pokeData.heightM*3.28084)+"'"+Math.round((pokeData.heightM*3.28084 - Math.floor(pokeData.heightM*3.28084))*12)+'"'
    const weightFreedom: string=(pokeData.weightKg*2.20462).toString()

    let evQt=0
    if(pokeData.evolutionChain)
        evQt=1 //todo: make this functional

    const arrowNormalRight=<svg width="107px" height="107px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#545454" strokeWidth="0.00024000000000000003" transform="rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M23.0681 11.9928L18.8183 7.75732L17.4065 9.17392L19.2419 11.0031L0.932836 11.0011L0.932617 13.0011L19.2373 13.0031L17.4158 14.8308L18.8324 16.2426L23.0681 11.9928Z" fill="#545454"></path> </g></svg>

    const thisPokeInfo=<PokeInfoCard pokeId={pokeData.pokemonId} img={pokeData.bigImage} name={pokeData.name} type1={pokeData.type1} type2={pokeData.type2 ? pokeData.type2 : undefined}/>

    const startGen=pokeData.sprites[0].gen

    const genName=(gen:number)=>{ //doesn't fit for locations, moves, and pokedex entries
        if(gen===1) return "Red and Blue"
        if(gen===2) return "Gold and Silver"
        if(gen===3) return "Ruby and Sapphire"
        if(gen===4) return "Diamond and Pearl"
        if(gen===5) return "Black and White"
        if(gen===6) return "X and Y"
        if(gen===7) return "Sun and Moon"
        if(gen===8) return "Sword and Shield"
        if(gen===9) return "Scarlet and Violet"
    }

    function spaceToDash(text:string){return text.toLowerCase().replace(" ", "-")}

    return (
        <Container classname={"pokemonPage"}>
            <h1 className={"pokePageHeader"}>{pokeData.name}</h1>
            {dexLinks}
            <UniversalNav urlBase={"/"} elements={navElements}/>
            <p>{pokeData.description}</p>
            <div classname={"mainData"} id={"dex-basics"}>
                <div className={"bigImgWrapper mainDataC"}>
                    <img src={pokeData.bigImage} alt={pokeData.name+"artwork"} className={"bigImg"}/>
                </div>
                <Container classname={"dexData mainDataC"}>
                    <h1 className={"catTitle"}>Pokedex data</h1>
                    <table className={"dexDataTable"}><tbody>
                        <tr><td>National Number</td><td>{pokeData.pokemonId.toString().padStart(3, "0")}</td></tr>
                        <tr><td>Type</td><td><PokeTypeD type={pokeData.type1}/>{pokeData.type2 ? <PokeTypeD type={pokeData.type2}/> : ""}</td></tr>
                        <tr><td>Species</td><td>{pokeData.species}</td></tr>
                        <tr><td>Height</td><td>{pokeData.heightM} m ({heightFreedom})</td></tr>
                        <tr><td>Weight</td><td>{pokeData.weightKg} kg ({weightFreedom} lbs)</td></tr>
                        <tr><td>Local Number</td>
                            <td>{pokeData.localId.map(localId =>(
                                    <><span className={"black"}>{localId.id.toString().padStart(3, "0")}</span>
                                    <span className={"grey"}>{(localId.pokedex)}</span>
                                    <br/></>
                                 ))}</td></tr></tbody></table>
                </Container> {/*dexData*/}
                <Container classname={"breeding mainDataC"}>
                    <h1 className={"catTitle"}>Breeding & Training</h1>
                    <table className={"dexDataTable"}><tbody>
                    <tr><td>Base Friendship</td><td>{pokeData.baseFriendship}</td></tr>
                    <tr>
                        <td>Catch Rate</td>
                        <td>Coming soon</td>
                    </tr>
                    <tr><td>Gender</td>
                        <td>
                        {pokeData.maleRatio+pokeData.femaleRatio==100 ?
                            <><span style={{color:"blue"}}>{pokeData.maleRatio+"% male"}</span>, <span style={{color:"hotpink"}}>{pokeData.femaleRatio+"% female"}</span></>
                            : "Genderless"}</td>
                    </tr>
                    <tr>
                        <td>Egg Groups</td>
                        <td>Coming soon</td>
                    </tr>
                    <tr>
                        <td>Catch rates</td>
                        <td>Coming soon</td>
                    </tr>
                    </tbody></table>
                </Container> {/*breeding and training*/}
            </div> {/*mainData*/}
            <Container classname={"typeEff"}>
                <div className={"defense"}>
                    <h2>Type defenses</h2>
                    <p className={"desc"}>The effectiveness of each type on {pokeData.name}, 2 and especially 4 means the enemy will defeat {pokeData.name} easily</p>
                    <table className={"typeEffTable"}><tbody>
                        <tr><PokeTypeDAll/></tr>
                        <tr>
                            {pokeData.typeEffectiveness.map(typeEffectiveness => (
                                    <td className={typeEffectiveness.AtMulti==0?"noEf":typeEffectiveness.AtMulti==0.25?"quarterEf":typeEffectiveness.AtMulti==0.5?"halfEf":typeEffectiveness.AtMulti==1?"normalEf":typeEffectiveness.AtMulti==2?"doubleEf":typeEffectiveness.AtMulti==4?"quadrupleEf":""}
                                    >{typeEffectiveness.AtMulti == 0.5? "½" : typeEffectiveness.AtMulti==0.25? "¼" : typeEffectiveness.AtMulti}</td>
                            ))}</tr></tbody>
                    </table>
                </div>
                <div className={"offense"}>
                    <h2>Type Attacks</h2>
                    <p className={"desc"}>The effectiveness of {pokeData.name} on each type</p>

                    <table className={"typeEffTable"}>
                        <thead><tr><PokeTypeDAll/></tr></thead>
                        <tbody>
                        <tr>
                            {pokeData.typeEffectiveness.map(typeEffectiveness => (
                                <td className={typeEffectiveness.DefMulti==0?"noEf":typeEffectiveness.DefMulti==0.25?"quarterEf":typeEffectiveness.DefMulti==0.5?"halfEf":typeEffectiveness.DefMulti==1?"normalEf":typeEffectiveness.DefMulti==2?"doubleEf":typeEffectiveness.DefMulti==4?"quadrupleEf":""}
                                >{typeEffectiveness.DefMulti == 0.5? "½" : typeEffectiveness.DefMulti==0.25? "¼" : typeEffectiveness.DefMulti}</td>
                            ))}</tr></tbody>
                    </table>
                </div> {/*offense */}
            </Container>  {/*type effectiveness */}
            {evQt>0 ?
            <Container classname={"evolutionChart"} id={"dex-evolution"}>
                <h2>Evolution Chart</h2>



            </Container>
            : ""} {/*todo: fix this so this is full chain not only next one, make a script (express) for it and pass the ready data, make this ready for different data*/}
            <Container classname={"pokedexEntries"} id={"dex-entries"}>
                <h1>Pokedex Entries</h1>
                <h2>{pokeData.name}</h2>
                <table className={"entriesTable"}><tbody>
                {pokeData.entries.map((entry, index) => (
                    <tr key={index}>
                        <td>
                            {entry.games[0].split(', ').map((game, gameIndex) => ([
                                <span key={gameIndex} className={"game_"+game.toLowerCase()}>{game}</span>,
                                <br/>
                            ]))}
                        </td>
                        <td>{entry.entry}</td>
                    </tr>
                ))}

                </tbody></table>
            </Container> {/*entries*/}
            <Container classname={"movesWrapper"} id={"dex-moves"}>
                {/*moves will be here, a lot of work*/}
            </Container> {/*todo*/}
            <Container classname={"spriteWrapper"} id={"dex-sprites"}>
                <h1 className={"catTitle"}>{pokeData.name} sprites</h1>
                <div className={"spritesTableWrapper"}>
                <table className={"spritesTable"}>
                    <thead><tr><th>Type</th>
                        {Array.from({length: 10 - startGen}, (_, i) => startGen + i).map(gen => (
                            <th key={gen}>Generation {gen}</th>
                        ))}
                    </tr></thead>
                    <tbody>
                    <tr><td>Normal</td>
                        {Array.from({length: 10 - startGen}, (_, i) => startGen + i).map(gen => {
                            const isFound: boolean = pokeData.sprites.some(s => s.gen === gen)
                            return (
                                <td key={gen}>
                                    {isFound ? <img src={pokeData.sprites.find(s => s.gen === gen).normal} alt={`Sprite of ${pokeData.name} from Pokemon ${genName(gen)}`}/> : '-'}
                                </td>
                            )
                        })}</tr>

                    <tr><td>Shiny</td>
                        {Array.from({length: 10 - startGen}, (_, i) => startGen + i).map(gen => {
                            const isFound: boolean = pokeData.sprites.some(s => s.gen === gen && s.shiny)
                            return (
                                <td key={gen}>
                                    {isFound && gen>1 ? <img src={pokeData.sprites.find(s => s.gen === gen).shiny} alt={`Shiny sprite of ${pokeData.name} from Pokemon ${genName(gen)}`}/> : '-'}
                                </td>
                            )
                        })}</tr></tbody></table>
                </div>
            </Container>
            <Container classname={"locations"} id={"dex-locations"}>
                <h1>Where to find {pokeData.name}</h1>
                <table className={"locTable"}><tbody>
                {pokeData.locations.map((location, index) => (
                    <tr key={index}> {/*game list column*/}
                        <td>
                            {location.games[0].split(',').map((game, gameIndex) => ([
                                <span key={gameIndex} className={("game_"+game.toLowerCase()).replace(' ','')}>{game}</span>,
                                <br/>
                            ]))}
                        </td>
                        <td>
                            {location.location.map((loc, locIndex) => (
                                loc.region ?
                                    <a key={locIndex} href={"locations/"+loc.region.toLowerCase()+"-"+ spaceToDash(loc.locationName)}>{loc.locationName} </a>
                                    : <span key={locIndex}>{loc.locationName=="T" ? "Trade/migrate from another game": loc.locationName=="E"? "Obtainable only through evolution": loc.locationName=="U"? "Unobtainable in this game": "No data yet"}</span>
                            ))}
                        </td>
                    </tr>
                ))}

                </tbody></table>
            </Container> {/*todo*/}
            {dexLinks}
        </Container>
    )
}

{//pokemon name title ✔️
//next/previous poke links ✔️
//universal nav from gen nav ✔️
//description (don't have it yet) ✔
//big image ✔️
//pokedex data h2: national n, type, species, height, weight, abilities (not yet), local n ✔️
//training h2: don't have this data yet but catch rate friendship, growth rate ✔️
//breeding h2: egg groups (not yet), gender, egg cycles (not yet) ✔️
//base stats, not yet ✔️
//type effectiveness and defenses ✔️
//evolution chart ️✔️
//pokedex entries for each game ✔️
//sprites h2 and table with both normal and shiny ✔️
//next/previous at the bottom ✔️
}
/*TODO: rest of this page: evolutions script, *moves*, scrobbler for poke yellow locations, description in db
   locations how to: data normally, game and location array, and when array is same as next game then copy it into new array as "game<br>game" copy rest of data normally
   evolutions: make express script, pulls data from db and puts it into interface with all evolutions data, and this is passed here, e.g chain for squirtle and blastoise looks the same
   description: add it to normal pokemon table in db, it's on page description
   moves: i have no f idea, but they have game families(not gens!), types(tm/hm/lvl) and only then a table, a lot of nesting, maybe better to pass tm and hm in separate fields???
   add tm hm to db if there's time, especially hm
 */
//moves learn by *pokemon* h2, universal nav for generations, choice for game in game, datatable with lvl move type category power accuracy, maybe tm and hm tables in future
//where to find *pokemon*, location linkS for each game or "trade/migrate" or "evolve"

//{pokeData.evolutions?.map(evolution => (
//                     <>
//                         {thisPokeInfo}
//                         <div> {arrowNormalRight }<br/> {evolution.method}</div>
//                         <PokeInfoCard pokeId={evolution.id} name={evolution.name} type1={evolution.type1} img={evolution.img} type2={evolution.type2 ? evolution.type2 : undefined}/>
//                    </>
//                 ))}