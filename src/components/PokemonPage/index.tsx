import React from "react"
import './style.scss'
import PokeInfoCard from "../PokedexPoke"

interface PokeData{
    pokemonId: number,
    localId:{
        pokedexId: number,
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
    special: string,
    evolutions:{
        id: number,
        name: string,
        method: React.ReactNode, //level etc.
        type1: string,
        type2?: string,
    }[]
    //copilot stop suggesting abilities array!!!
}


interface Sprites {
    pokemonName: string,
    sprites:{
      gen: number,
      normal: string,
      shiny?: string,
    }[]
}
export function SpriteGens({sprites}:{sprites:Sprites}){
    const startGen=sprites[0].gen
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


    return(
        <table>
        <thead>
            <tr>
                <th>Type</th>
                {sprites.sprites.map((sprite, index) => (
                    <th key={index}>Gen {sprite.gen}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Normal</td>
                {Array.from({length: 10 - startGen}, (_, i) => startGen + i).map(gen => {
                    const isFound: boolean = sprites.sprites.some(s => s.gen === gen)
                    return (
                        <td key={gen}>
                            {isFound ? <img src={sprites.sprites.find(s => s.gen === gen).normal} alt={`Sprite of ${sprites.pokemonName} from Pokemon ${genName(gen)}`}/> : '-'}
                        </td>
                    )
                })}
            </tr>
            <tr>
                <td>Shiny</td>
                {Array.from({length: 10 - startGen}, (_, i) => startGen + i).map(gen => {
                    const isFound: boolean = sprites.sprites.some(s => s.gen === gen && s.shiny)
                    return (
                        <td key={gen}>
                            {isFound && gen>1 ? <img src={sprites.sprites.find(s => s.gen === gen).shiny} alt={`Shiny sprite of ${sprites.pokemonName} from Pokemon ${genName(gen)}`}/> : '-'}
                        </td>
                    )
                })}
            </tr>
        </tbody>
        </table>
    )
}


//it can't be chart in itself, too much redundancy, but it in main export


export default function PokemonPage() {
    return (
        <>
        </>
    )
}

//in return
//pokemon name title
//next/previous pokelinks
//universal nav from gen nav
//description (don't have it yet)
//big image
//pokedex data h2: national n, type, species, height, weight, abilities (not yet), local n
//training h2: don't have this data yet but catch rate friendship, growth rate
//breeding h2: egg groups (not yet), gender, egg cycles (not yet)
//base stats, not yet
//type effectiveness and defenses
//evolution chart
//pokedex entries for each game
//moves learn by *pokemon* h2, universal nav for generations, choice for game in game, datatable with lvl move type category power accuracy, maybe tm and hm tables in future
//sprites h2 and table with both normal and shiny ✔️
//where to find *pokemon*, location linkS for each game or "trade/migrate" or "evolve"
//next/previous at the bottom