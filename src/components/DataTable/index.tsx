import  React  from 'react'
import './style.css'

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

//todo: make sortable if i have time left