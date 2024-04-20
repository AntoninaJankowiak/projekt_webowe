import React from "react"
import './style.scss'
import Container from "../Container"

export default function Video({ videoId }: { videoId: string }){
    if(!videoId)
        videoId="dQw4w9WgXcQ" //tak, to jest rickroll jako defaultowy link
    const link="https://www.youtube.com/embed/"+{}
    return (
        <Container classname={"videoContainer"}>
            <p className={"videodescribtion"}></p>
            <iframe src={"https://www.youtube.com/embed/" + videoId} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen></iframe>

        </Container>
    )
}