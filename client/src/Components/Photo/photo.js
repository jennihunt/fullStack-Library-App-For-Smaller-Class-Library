import React from "react"
import "./photo.css"

export default function Photo({source,id,alt}){
    return(
<img id={id} src={source} alt={alt}/>

    )
}