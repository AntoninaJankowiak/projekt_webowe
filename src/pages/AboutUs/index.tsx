import React from 'react';
import Header from '../../components/header'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import LoremIpsum from "react-lorem-ipsum"

export default function AboutUs (){
    return (
       <Container classname={"mainDiv"}>
           <Header></Header>
           <NavBar></NavBar>
           <Container classname={"main"}>
                <LoremIpsum p={4}/>
           </Container>
           <Footer/>
       </Container>
    )
}

