import React from "react";
import "./header.css"

// make sure to pass in id here if you wish to target your h1's all different
export default function Header({id, message}){
    return (
        <div id="headerC">
        <h1 id ={id}>{message}</h1>
        </div>
    )
}