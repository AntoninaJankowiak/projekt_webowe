export function fixNamesFromDbToUrl(pokemonName){
    pokemonName=pokemonName.toLowerCase()
    if(pokemonName==="nidoran♀") pokemonName="nidoran-f"
    else if(pokemonName==="nidoran♂") pokemonName="nidoran-m"
    else if(pokemonName==="mr. mime") pokemonName="mr-mime"
    else if(pokemonName==="mime jr.") pokemonName="mime-jr"
    else if(pokemonName==="flabébé") pokemonName="flabebe"
    else if(pokemonName==="farfetch'd") pokemonName="farfetchd"
    //else pokemonName.replace(' ','-')
    return pokemonName
}
export function fixNamesUrlToDb(pokemonName){
    if(pokemonName==="nidoran-f") pokemonName="nidoran♀"
    else if(pokemonName==="nidoran-m") pokemonName="nidoran♂"
    else if(pokemonName==="mr-mime") pokemonName="mr. mime"
    else if(pokemonName==="mime-jr") pokemonName="mime jr."
    else if(pokemonName==="flabebe") pokemonName="flabébé"
    else if(pokemonName==="farfetchd") pokemonName="farfetch'd"
    else pokemonName=pokemonName.replace('-',' ')
    pokemonName=firstUppercase(pokemonName)
    return pokemonName
}
function firstUppercase(word){
    return word[0].toUpperCase()+word.slice(1)
}

export function fixNamesToDb(pokemonName){
    pokemonName=firstUppercase(pokemonName.toLowerCase().replace('♀','-f')
        .replace('♂','-m').replace("'","")
        .replace('. ','-').replace("é","e"))
    //idk if it works as expected, i copied it from some code todo: write tests or smth
    return pokemonName
}
