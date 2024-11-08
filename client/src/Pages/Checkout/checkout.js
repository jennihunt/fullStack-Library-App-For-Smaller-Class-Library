import { useState, useEffect } from "react"
import Header from "../../Components/Header/header"
import "./checkout.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyCheckout() {

    const [name, setName] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [bookList, setBookList] = useState([]);
    const [title, setTitle] = useState([]);
    const [author, setAuthor] = useState([]);
    const [bookID, setbookID] = useState([]);
    const [avaliable, setAvaliable] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        //fetch data from API
        axios
            .get("http://localhost:8080/checkIn")
            .then((res) => {
                setName(res.data);
                // sets the checkout info to be displayed under the name state
            })
            .catch((err) => {
                console.log("Error fetching data:", err)
            });

        axios
            .get("http://localhost:8080/inventory")
            .then((res) => {
                setBookList(res.data)
                // sets the book's info to be displayed under the bookList state
            })
            .catch((err) => {
                console.log("Error fetching book data", err)
            })
    }, []);

    const handleNameChange = (e) => {
        setStudentName(e.target.value);
    };

    const handleCheckout = (id, _id) => {
        bookList.filter((book) => {
            // console.log(book.bookID)
            // console.log(id)
            if (book.bookID == id) {
                setAuthor([...author, book.author]);
                setTitle([...title, book.title]);
                setbookID([...bookID, book.bookID]);
                book.avaliable = !book.avaliable;
            }
        })
        // console.log(bookID)

        axios
            .put(`http://localhost:8080/inventory/${_id}`,
                bookList.find((book) => book._id === _id)
            )
            .then((res) => {
                console.log("Book updated: " + res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title)
        console.log(author)

        let Duedate = new Date();
        Duedate.setDate(Duedate.getDate() + 7);
        if (author.length > 0) {
            setName([...name, {
                studentName: studentName,
                author: author,
                title: title,
                bookID: bookID,
                dueDate: Duedate.toDateString()
            }]);

            const studentData = {
                studentName: studentName,
                author: author,
                title: title,
                bookID: bookID,
                dueDate: Duedate.toDateString()
            };
            //Send a Post request to the server using promises
            axios
                .post("http://localhost:8080/checkIn", studentData)
                .then((res) => {
                    console.log("Post response:", res.data);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
            //Clear the form inputs after successful submission
            setStudentName('');
            setAuthor([]);
            setbookID([]);
            setTitle([]);
            navigate("/dueDates");
            document.getElementById("chooseBookWarning").firstChild.classList.add("hidden")
        } else {
            // alert( "🔊 Pick a book for the user to check-out before submitting ")
            // document.getElementById("chooseBookWarning").firstChild.classList.remove("hidden")
            var x = document.getElementById("chooseBookWarning");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000)

        }
    }

    return (
        <div>
            <Header id="loginHeader" message={"✔ Check it Out !!"} />

            <form id="checkoutform" onSubmit={handleSubmit}>
                <input
                    className="loginInfo"
                    type="text"
                    placeholder="Student Checking out book/s"
                    value={studentName}
                    onChange={handleNameChange}
                    required /><br/><br/>

                <ul id="myList">
                    {bookList.map((book, index) => {
                        if (book.avaliable) {
                            return (

                                <div key={book._id} className="checkoutblocks">

                                    <span id="title"><b> Title:</b> "{book.title}" </span><br />
                                    <span id="author2"><i>📚Author:</i> {book.author}</span><br />
                                    <span id="author2"><i> Book-Id#{book.bookID}</i></span><br />

                                    <button id="checkOutBtn" onClick={() => handleCheckout(book.bookID, book._id)}>Check Out</button>

                                    <hr />
                                </div>
                            )
                        }
                    })}
                </ul>
                {/* The below div only shows when user tries to submit form without choosing a book */}
                <div id="chooseBookWarning" role="alert">
                    <span >
                        <i>** Pick a book before completing checkout **</i>
                    </span>
                </div>

                <button className="btn" type="submit">submit</button>
            </form>
        </div>
    )



}