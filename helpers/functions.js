export function fixNamesFromDbToUrl(pokemonName){
    pokemonName=pokemonName.toLowerCase().replace('♀','-f')
        .replace('♂','-m').replace("'","")
        .replace('. ','-').replace("é","e")
        .replace(' ','-').replace('.','')
        .replace(':','')

    return pokemonName
}
export function fixNamesUrlToDb(pokemonName){
    //MUSI BYĆ RĘCZNIE W TYCH PRZYPADKACH, ponieważ inaczej nie wiadomo czy zostawić "-" czy wymienić na spacje
    if(pokemonName==="nidoran-f") pokemonName="nidoran♀"
    else if(pokemonName==="nidoran-m") pokemonName="nidoran♂"
    else if(pokemonName==="mr-mime") pokemonName="mr. Mime"
    else if(pokemonName==="mr-rime") pokemonName="mr. Rime"
    else if(pokemonName==="mime-jr") pokemonName="mime jr."
    else if(pokemonName==="flabebe") pokemonName="flabébé"
    else if(pokemonName==="farfetchd") pokemonName="farfetch''d"
    else if(pokemonName==='sirfetchd') pokemonName="sirfetch'd"
    else if(pokemonName==='type-null') pokemonName="type: Null"
    else if(pokemonName==='porygon-z') pokemonName="porygon-Z"
    else pokemonName=pokemonName.replace('-',' ')
    pokemonName=firstUppercase(pokemonName)

    let hitSpace=false
   for(let i=0; i<pokemonName.length;i++){
       if(hitSpace){
           pokemonName = pokemonName.slice(0, i) + pokemonName[i].toUpperCase() + pokemonName.slice(i + 1)
           hitSpace=false
       }
       if(pokemonName[i]===" ")
           hitSpace=true
   }
    return pokemonName
}
export function firstUppercase(word){
    return word[0].toUpperCase()+word.slice(1)
}
