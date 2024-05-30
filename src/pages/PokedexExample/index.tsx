import React from 'react';
import Header from '../../components/header/index.tsx'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import PokeInfoCard from "../../components/PokedexPoke"
import './style.scss'
export default function PokedexExample (){
    return (
       <Container classname={"mainDiv"}>
           <Header></Header>
           <NavBar></NavBar>
           <Container classname={"main"}>
               <div className={"flex"}>
                <PokeInfoCard img={"https://i2-prod.mirror.co.uk/incoming/article3686913.ece/ALTERNATES/s1200/PAY-Balcony-horse.jpg"} pokeId={2137} name={"Juan"} type1={"Fire"}/>
               <PokeInfoCard img={"https://i.pinimg.com/564x/f0/0b/b9/f00bb9c4577154c2b4f8dde48819e292.jpg"} pokeId={2138} name={"Hector"} type1={"Fairy"}/>
               </div>
           </Container>
           <Footer/>
       </Container>
    )
}
