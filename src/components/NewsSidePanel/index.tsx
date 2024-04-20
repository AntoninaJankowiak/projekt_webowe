import React from "react"
import './style.scss'
import Container from "../Container"
import {formatDate} from "../Article"
export interface NewsNav{
    news: {
      date:string,
      category: string,
      title: string,
      href: string
    }[]
}

export default function NewsSidePanel({newsNav}:{newsNav: NewsNav}){
    return (
        <Container classname={"newsSidePanel"}>
            <h1>Recent news</h1>
            <ul className={"newsList"}>
            {newsNav.news.map((item, index)=>(
                <li className={"newsListItem"}>
                    <a href={item.href}>{item.title}</a>
                    <p className={"newsListDesc"}>{formatDate(item.date)} • {item.category}</p>
                </li>
            ))}
            </ul>
        </Container>
    )
}