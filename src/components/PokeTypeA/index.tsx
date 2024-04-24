import React from "react"
export const pokemonTypesColors = [
    { type: "Normal", color: "#787864" },
    { type: "Fire", color: "#d21e0f" },
    { type: "Water", color: "#0083f8" },
    { type: "Electric", color: "#ca9625" },
    { type: "Grass", color: "#5eb543" },
    { type: "Ice", color: "#0aabf9" },
    { type: "Fighting", color: "#a64b3f" },
    { type: "Poison", color: "#864477" },
    { type: "Ground", color: "#be9735" },
    { type: "Flying", color: "#5374f8" },
    { type: "Psychic", color: "#fb2378" },
    { type: "Bug", color: "#4f7309" },
    { type: "Rock", color: "#9d8b3f" },
    { type: "Ghost", color: "#5941e8" },
    { type: "Dragon", color: "#301ea6" },
    { type: "Dark", color: "#652c06" },
    { type: "Steel", color: "#8d8da8" },
    { type: "Fairy", color: "#ff13f4" },
]
//this is for a single type box
export function isTypeValid(type){
    return pokemonTypesColors.some(pokemonType => pokemonType.type === type);
}

export default function PokeTypeA({type}:{type:string}){
    if(!isTypeValid(type))
        return (<a className={"pokeType"} style={{backgroundColor: "black"}} href={""}>Error</a>)

    return (
        <a className={"pokeType"} style={{backgroundColor: pokemonTypesColors.find(pokemonType => pokemonType.type === type).color}} href={"/type/"+type}>{type}</a>
    )
}
