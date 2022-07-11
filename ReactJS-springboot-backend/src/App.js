import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListEmployee from "./components/ListEmployee";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployee from "./components/CreateEmployee";
import UpdateEmployee from "./components/UpdateEmployee";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Routes>
            <Route exact path="/add-employee" element ={<CreateEmployee/>} ></Route>            
            <Route exact path="/" element ={<ListEmployee/>} ></Route>
            <Route exact path="/employees" element ={<ListEmployee/>}></Route>
            <Route exact path="/update-employee/:id" element ={<UpdateEmployee/>}></Route>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
