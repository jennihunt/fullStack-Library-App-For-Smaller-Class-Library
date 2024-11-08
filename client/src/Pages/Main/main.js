import Header from "../../Components/Header/header"
import React, { useEffect, useState } from "react"
import "./main.css"
import { Link } from "react-router-dom";
import axios from "axios";

export default function Main() {
    const [bookList, setBookList] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [avaliable, setAvaliable] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:8080/inventory")
            .then((res) => {
                setBookList(res.data)
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // below allows data to show up on page
        setBookList([...bookList, { title: title, author: author, description: description, avaliable: avaliable }])
        const newBook = {
            title: title,
            author: author,
            description: description,
            avaliable: avaliable
        };
        axios
            .post("http://localhost:8080/inventory/", newBook)
            .then((res) => {
                console.log("Post response:", res.data);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
        setTitle("");
        setAuthor("");
        setDescription("");

    };


    // function called when delete btn is clicked
    const handleDelete = (e) => {
        console.log(e.target.value);
        axios
            .delete(`http://localhost:8080/inventory/${e.target.value}`)
            .then((res) => {
                console.log("Book deleted: " + res.data)
                setBookList(bookList.filter((book) => book._id !== e.target.value));
            })
            .catch((err) => {
                console.log(err);
            });
    };





    return (
        <div >
            <Header id="mainHeader" message={"Welcome to our Library"}></Header>
            <div id="mappeditems">
                <hr/>
              
                {bookList.map(e => (
                    <div key={e.id} id="each-Item">
                        
                            <span id="taskSpan">📚Author: {e.author}</span><br />
                            <span>Title: "{e.title}"</span><br />
                            <span>Description: {e.description}</span><br />
                            
                            <div id="backofcard">{e.title}</div>
                    </div>
                ))}

            </div>    

            <Link to={"/checkin"} className={"mainBtn"}>Go To Check-Out Page</Link>

        </div>
    )
}
