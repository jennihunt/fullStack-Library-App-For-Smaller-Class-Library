import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.css"
export default function Navbar(){
    return (
        <nav>
<ul id="nav-ul">
    <li>
        <NavLink  to= '/'>Home</NavLink>
    </li>
    <li>
        <NavLink to="/checkIn">Check-Out </NavLink>
    </li> 
    <li>
        <NavLink to="/dueDates">Books Due</NavLink>
    </li>
    <li>
        <NavLink to="/inventory">Inventory</NavLink>
    </li>
<div className="dropdown">
    <p className="dropbtn">Information</p>
     <div className="dropdown-content">
     <a href="">Are you looking for a book to help you, and want to check out what we have?? See the list below to view all the books we contain in the library. Please remember to treat them as your own!</a>
    </div>
    </div>
    </ul>

        </nav>
    )
}