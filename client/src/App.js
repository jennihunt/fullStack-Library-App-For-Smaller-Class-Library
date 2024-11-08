import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/navbar"
import Main from "./Pages/Main/main"
import MyCheckout from "./Pages/Checkout/checkout"
import Inventory from "./Pages/Inventory/inventory"
import BooksDue from "./Pages/BooksDue/due"
import Oops from "./Pages/Error/error"
 import './App.css';


function App() {
return (
    <div className="App">
      <Router>
 <Navbar />
 <Routes>
 <Route path="/" element = {<Main/>}/>
   <Route path="/checkIn" element = {<MyCheckout/>}/>
   <Route path="/dueDates" element = {<BooksDue/>}/>
   <Route path="/inventory" element = {<Inventory/>}/>  
   <Route path="*" element={<Oops/>}/>
 </Routes>
   
   </Router>  
</div>
  );
}

export default App;
