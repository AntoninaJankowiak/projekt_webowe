import  React  from 'react'
import './style.css'
import Container from "../Container"
import {Capitalize} from "../PokedexPoke"

export interface TableItems{
    columns: {
        name: string,
        sortable: boolean,
        items: {
            value: React.ReactNode
        }[]
    }[]
}

export default function SortableTable({items}:{items: TableItems}){
    return(
        <table className={"tableC"}>
            <thead><tr>
                {items.columns.map((column, index) => (
                    <th key={index}>{column.name} </th>
                ))}
            </tr></thead>
            <tbody>
                {items.columns[0].items.map((item, index) => (
                    <tr key={index}>
                        {items.columns.map((column, index) => (
                            <td key={index}>{item.value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export function TableSearch(){
    return(
        <Container classname={"searchTable"}>
            <label htmlFor="searchTableInput">Filter: </label>
            <input type="text" id="searchTableInput"/>
        </Container>
    )
}

export function TableFilterBy({filterColumn, filterItems}:{filterColumn: string, filterItems: string[]}){
    return(
        <Container classname={"filterTable"}>
           <label htmlFor="tableFilter">{filterColumn}: </label>
              <select id="tableFilter">
                <option value="all">- All - </option>
                {filterItems.map((item, index) => (
                     <option key={index} value={item.toLowerCase()}>{Capitalize(item)}</option>
                ))}
                </select>
        </Container>
    )
}



//<label htmlFor="filterCategory">{filterColumn}: </label>
//todo: make sortable only if i have time left