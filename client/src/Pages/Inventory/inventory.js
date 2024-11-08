import "./inventory.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../Components/Header/header";

export default function Inventory() {
    const [bookList, setBookList] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [bookID, setbookID] = useState();
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
        setBookList([...bookList, { title: title, author: author, description: description, bookID: bookID, avaliable: avaliable }])

        const newBook = {
            title: title,
            author: author,
            description: description,
            bookID: bookID,
            avaliable: avaliable
        };

        axios
            .post("http://localhost:8080/inventory", newBook)
            .then((res) => {
                console.log("Post response:", res.data);
            })
            .catch((error) => {
                console.log("Error:", error);
            });
        setTitle("");
        setAuthor("");
        setDescription("");
        setbookID();
    };


    // function called when delete btn is clicked
    const handleDelete = (id) => {
        // console.log(e.target.value);
        axios
            .delete(`http://localhost:8080/inventory/${id}`)
            .then((res) => {
                console.log("Book deleted: " + res.data)
                setBookList(bookList.filter((book) => book.bookID !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Header id="header1" message={"Inventory Page"}></Header>
            <ul id="myList">
                {bookList.map((book, index) => {
                    return (

                        <div key={book._id}>
                            <button id="deleteIt" onClick={() => handleDelete(book.bookID)} >
                                Delete🗑
                            </button>
                            <span id="title">Title: "{book.title}" </span><br />
                            <span id="author">📚Author: {book.author}</span><br />
                            <span id="description">Description: {book.description}</span><br />
                            <span id="description">Book-Id# : {book.bookID}</span><br/>                         
                            
                            <hr />
                        </div>

                    )
                })}
            </ul><br/>
            
            <Header id="header2" message={"AddBooks"}></Header><br /><br />
         
            <form id="addbookform">
                <input
                    type="text"
                    className="title"
                    placeholder="title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                /><br/>
                
                <input
                    type="text"
                    className="author"
                    placeholder="Author..."
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                /><br/>
                
                <input
                    type="text"
                    className="description"
                    placeholder="description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /><br/>
                

                <input
                    type="number"
                    className="description"
                    placeholder="book ID number"
                    value={bookID}
                    onChange={(e) => setbookID(e.target.value)}
                /><br/><br/>
                
                <button className="inventoryBtn" type="submit" onClick={handleSubmit}>
                    to dataBase...
                </button>
            </form>

        </>
    )
}

