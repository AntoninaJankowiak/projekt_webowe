import React from 'react';
import Header from '../../components/header'
import Container from "../../components/Container";
import NavBar from "../../components/navbar"
import Footer from "../../components/footer"
import SortableTable, {TableItems} from "../../components/DataTable"

export default function ExampleDataTable (){
    return (
       <Container classname={"mainDiv"}>
           <Header></Header>
           <NavBar></NavBar>
           <Container classname={"main"}>
                <SortableTable items={items1}/>
           </Container>
           <Footer/>
       </Container>
    )
}

const items1: TableItems={
    columns:[
        {
            cname: "Kolumna",
            sortable: false,
            items: [
                {value: <a>itemek</a>},
                {value: <b>drugi itemek</b>}
            ]
        }
    ]
}
