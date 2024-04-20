export function fixNamesFromDb(pokemonName){
    if(pokemonName==="nidoran♀") pokemonName="nidoran-f"
    else if(pokemonName==="nidoran♂") pokemonName="nidoran-m"
    else if(pokemonName==="mr. mime") pokemonName="mr-mime"
    else if(pokemonName==="mime jr.") pokemonName="mime-jr"
    else if(pokemonName==="flabébé") pokemonName="flabebe"
    else if(pokemonName==="farfetch'd") pokemonName="farfetchd"

    return pokemonName
}
function firstUppercase(word){
    return word[0].toUpperCase()+word.slice(1)
}

export function fixNamesToDb(pokemonName){
    pokemonName=firstUppercase(pokemonName.toLowerCase().replace('♀','-f')
        .replace('♂','-m').replace("'","")
        .replace('. ','-').replace("é","e"))
    //idk if it works as expected already, i copied it from some code
    return pokemonName
}
