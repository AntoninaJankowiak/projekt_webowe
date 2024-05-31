import React from 'react';
import Header from '../../components/header/index.tsx'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import DescriptionPage from "../../components/descriptionPage"
import Video from "../../components/Video"
import List, {ListItems} from "../../components/List"
import Article from "../../components/Article"
import PokemonPage, {PokeData} from "../../components/PokemonPage"

const shortDesc="Welcome! We believe in making Pokémon information as clear and easy to digest as possible...change this later it's stolen"
//TODO: change the description, it's 100% stolen now, just a placeholder
const list: ListItems = {
    items: [
            {item: "We added bugs ", linkText: " see it here", linkHref:"https://www.youtube.com/watch?v=xvFZjo5PgG0"},
            {item: "You can glitch now"}
    ],
    type: 'circle'
}


export default function HardcodedArticle (){
    return (
       <Container classname={"mainDiv"}>
           <Header></Header>
           <NavBar></NavBar>
           <Container classname={"main"}>
               <Article listItems={list} date={'2005-04-03'} introPg={"Yeahh pope died"} mainPg={"because of this event we:"} newsTitle={"Polish pope died of yellowness"} newsCategory={"Pokemon Scarlet and Violet"} videoLink={"https://www.youtube.com/watch?v=-lJj1ONfUnU"}/>
           </Container>
           <Footer/>
       </Container>
    )
}

//<DescriptionPage mainTitle={"Pokémon Database - News & Updates"} shortDescription={shortDesc}/>


//<Video/> WORKS

/*const list: ListItems = {
    items: [
        {item: "We added bugs"},
        {item: "You can glitch now"}
    ]
}*/
//<List listItems={list}/> WORKS TOO
