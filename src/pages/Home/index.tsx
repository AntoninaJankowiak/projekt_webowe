import React from 'react';
import Header from '../../components/header/index.tsx'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import ArticlePreview from "../../components/ArticlePreview"

export default function Home (){
    return (
       <Container classname={"mainDiv"}>
           <Header></Header>
           <NavBar></NavBar>
           <Container classname={"main"}>
               <h2>Aplikacja tak średnio działa, nie udało się zrobić działającego połączenia z backend, więc parę hardcoded rzeczy zrobionych za pomocą komponentów:</h2>
               <a href={"/pokedex"}>Taka lista z informacjami o różnych pokedexach</a> <br/>
               <a href={"/pokedex/pokemon"}>Przykładowe dane pokemona, backend do tego endpoint istnieje ale nie działa, backend/index.js</a><br/>
               <a href={"/articles/article"}>Przykładowy artykuł z użyciem komponentów</a><br/>
               <a href={"/pokedex/example"}>Przykładowa lista pokemonów, niestety też hardcoded</a><br/>
               <a href={"/table"}>Przykładowa tabelka która byłaby użyta do różnych rzeczy</a>
               <p>Poniżej lista artykułów która normalnie by tu była</p>
               <ArticlePreview newsTitle={"Artykuł1"} date={'2005-04-03'} newsCategory={'Pokemon'} introPg={'Yeahhh pope died'} videoLink={'https://www.youtube.com/watch?v=oavMtUWDBTM'} articleLink={"/articles/article"}/>
               <ArticlePreview newsTitle={"Jakiś kolejny artykuł"} date={'2077/04/03'} newsCategory={'Pokemon 30th gen'} introPg={'Oni nigdy nie przestaną wypuszczać tych gier'} videoLink={'https://www.youtube.com/watch?v=oavMtUWDBTM'} articleLink={"/articles/article"}/>
           </Container>
           <Footer/>
       </Container>
    )
}
