const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Book = require("./bookModel")
const CheckOutNames = require("./checkoutModel");
const AllBooks=require("./currentBooks/currentBooks.json")
// app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


mongoose.connect("mongodb://127.0.0.1:27017/newLibrary", () => {
    console.log("MongoDB is now connected")
}, e => console.log(e));

app.get("/",(req,res)=>{
res.send("hello world")
})

//below creates and adds studentName to my database
app.post("/checkIn", (req, res) => {
    console.log("This is the body")
    console.log(req.body)
    const { studentName, title, author, bookID ,dueDate} = req.body;
    const newUser = new CheckOutNames({
        studentName: studentName,
        title:title,
        author:author,
        bookID:bookID,
        dueDate:dueDate
    });

    newUser.save()
        .then(savedUser => {
            console.log("user saved:", savedUser);
            res.json(savedUser);
        })
        .catch(error => {
            console.error("Error savng user:", error);
            res.status(500).json({ error: " An error occured while saving the user" })
        });
});

app.get("/checkIn", async (req, res) => {
    try {
        const people = await CheckOutNames.find({});
        res.json(people);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database")
    }
})
// Update checkout info by id
app.put("/checkIn/:id", (req, res) => {
    CheckOutNames.findByIdAndUpdate(
        req.params.id,
        {
            studentName: req.body.studentName,
            title: req.body.title,
            author: req.body.author,
            bookID:req.body.bookID,
            dueDate:req.body.dueDate
        },
        { new: true }
    )
        .then((data) => {
            console.log("Checkouts updated: " + data);
            res.json(data);
        })
        .catch((err) => {
            console.log("error updating Checkouts: " + err);
            res.status(500).send("Error updating Checkouts");
        });
});

//Delete Checkout info based off params
app.delete("/checkIn/:bookID", (req, res) => {
    console.log(req.params.bookID)
    console.log(typeof req.params.bookID)
    CheckOutNames.findOneAndDelete({bookID:req.params.bookID})
        .then((data) => {
            console.log("Checkout deleted: " + data);
            res.send("checkout deleted")// Closes request by responding to it
        })
        .catch((err) => {
            console.log("Error deleting checkout: " + err);
            res.status(500).send("Error deleting checkout");
        })
})



// below is to add book information to my database
app.post("/inventory", (req, res) => {
    console.log("This is also the body")
    console.log(req.body)
    const { title, author, description, avaliable,bookID } = req.body;
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        bookID:req.body.bookID,
        avaliable: req.body.avaliable

    });
    newBook.save()
    .then(savedUser => {
        console.log("checkout saved:", savedUser);
        res.json(savedUser);
    })
    .catch(error => {
        console.error("Error savng checkout:", error);
        res.status(500).json({ error: " An error occured while saving the user" })
    });

})
console.log(AllBooks)
app.get("/inventory",async (req, res) => {//allbooks
    try {
        
        const book = await Book.find({});
        res.json( book);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from database")
    }
})

// Update a book
app.put("/inventory/:id", (req, res) => {
    Book.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            bookID:req.body.bookID,
            avaliable: req.body.avaliable
        },
        { new: true }
    )
        .then((data) => {
            console.log("Books updated: " + data);
            res.json(data);
        })
        .catch((err) => {
            console.log("error updating book: " + err);
            res.status(500).send("Error updating book");
        });
});

// Delete a book
app.delete("/inventory/:bookID", (req, res) => {
    Book.findOneAndDelete({bookID:req.params.bookID})
        .then((data) => {
            console.log("Testing stuff: " + data);
            res.send("book deleted")// Closes request by responding to it

        })
        .catch((err) => {
            console.log("Error deleting book: " + err);
            res.status(500).send("Error deleting book");
        })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});