import "./due.css"
import { useState, useEffect } from "react"
import axios from "axios";
import Header from "../../Components/Header/header"
import { useNavigate } from "react-router"


export default function BooksDue() {
    const [info, setInfo] = useState([])
    const [bookList, setBookList] = useState([])
    const navigate = useNavigate;

    useEffect(() => {
        axios
            .get("http://localhost:8080/checkIn")
            .then((res) => {
                console.log(res.data)
                setInfo(res.data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err)
            });

        axios
            .get("http://localhost:8080/inventory")
            .then((res) => {
                setBookList(res.data)
            })
            .catch((err) => {
                console.log("Error fetching book data", err)
            })

    }, []);

    const addBookback = (id) => {
        let oficalID = ''
        console.log(id.length)
        bookList.filter((book) => {
            if (book.bookID == id) {
                console.log(book.bookID)
                console.log(id)
                oficalID = book._id
                book.avaliable = true;       
            }
            else if (id.length > 1 && id.includes(book.bookID) == true) {
                console.log('more than 1 value')
                oficalID = book._id
                book.avaliable = true;
            }
        })

        console.log(oficalID)



        if (id.length === 1) {
            console.log(oficalID)
            axios
                .put(`http://localhost:8080/inventory/${oficalID}`,
                    bookList.find((book) => book.bookID == id)
                )
                .then((res) => {
                    console.log(res.data)
                    console.log("Book updated: " + res.data);
                })
                .catch((err) => {
                    console.log(err);
                });

            axios
                .delete(`http://localhost:8080/checkIn/${id}`)
                .then((res) => {
                    console.log("Checkout deleted: " + res.data)
                    setInfo(
                        info.filter((person) => {
                            if (id.length === 1) {
                                return person.bookID !== id
                            }
                        }));
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            let singleID
            let thebook_id = ''
            for (let i = 0; i < id.length; i++) {
                singleID = id[i]

                bookList.filter((book) => {
                    if (book.bookID === singleID) {
                        thebook_id = book._id
                    }
                })

                console.log(singleID)
                if (id.length > 1) {
                    axios
                        //Grab ahold of the correct id , meaning the _id instead of the bookID
                        .put(`http://localhost:8080/inventory/${thebook_id}`,
                            bookList.find((book) => {
                                // console.log(thebook_id)
                                // console.log(book.bookID)
                                // console.log(id.includes(singleID)==true)
                               if( id.includes(singleID) === true&& singleID === book.bookID){
                                return book}
                            })
                        )
                        .then((res) => {
                            console.log("Book updated: " + res.data);
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                }
            }
            axios
                .delete(`http://localhost:8080/checkIn/${singleID}`)
                .then((res) => {
                    console.log("Checkout deleted: " + res.data)
                    setInfo(info.filter((person) => !person.bookID.includes(singleID) ));
                })
                .then((res) => {
                    console.log(res)
                    singleID = ''
                    thebook_id = ''
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }


    return (
        <>
            <Header
                id="dueHeader"
                message={"Books CheckedOut"} />

            <ul id="dueList">
                {info.map((names) => {
                    return (

                        <li key={names._id} id="checkoutsticky">
                            <h3 id="studentName">{names.studentName}</h3>
                            <div>
                                <h5>Checked Out the following book(s):</h5>
                                <h6> {names.title.length > 1 ? names.title + " , " : names.title}</h6>
                                <h6> {names.author.length > 1 ? names.author + " , " : names.author}</h6>
                                <h6><i>Id number(s): </i>{names.bookID.length > 1 ? names.bookID + "," : names.bookID}</h6>
                                <h6>Due Back On: <u>{names.dueDate}</u></h6>
                            </div>
                            <button id="duebutton"onClick={() => addBookback(names.bookID)}>Check books back in</button>
                        </li>

                    )
                })}
            </ul>
        </>
    )
}