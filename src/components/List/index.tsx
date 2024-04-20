import React from "react"
import './style.scss'

export interface ListItems{
    type?: string,
    items: {
        item: string
        linkText?: string
        linkHref?: string
    }[]
}

export default function List({listItems}:{listItems: ListItems}){
    return (
        <div className={"listDiv"}>
            {listItems.items.map((item,index)=>(
                <ul className={"changelogList " + (listItems.type === 'disc' ? 'styleDisc' : listItems.type === 'square' ? 'styleSquare' : listItems.type === 'circle' ? 'styleCircle': 'styleNone')}>
                    <li className={"changelogItem"}>
                        {item.linkText ? <>{item.item}<a href={item.linkHref} className={"listLink"}>{item.linkText}</a></> : (item.item)}
                    </li>
                </ul>


            ))}
        </div>
    )
}