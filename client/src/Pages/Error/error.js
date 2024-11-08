import React from "react"
import "./error.css"
import Photo from "../../Components/Photo/photo"
import scream from "../../Components/assets/images/scream.jpg"
import { Link } from "react-router-dom";


export default function Oops(){
    return (
        <>
        <h1 id="error">This page does NOT exsist</h1> 
        <Photo id="screaming" source={scream} alt="oops"/>
        <Link to={"/"} className={"main-a"}>Go to Main Page</Link>
        </>
        
    )
}