import React from 'react';
import Header from '../../components/header/index.tsx'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"

export default function Home (){
    return (
       <Container>
           <Header></Header>
           <NavBar></NavBar>
           <Footer/>
       </Container>
    )
}