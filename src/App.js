import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as R,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateCom from './components/PrivateCom';
import User from './components/User';
import Alert from './components/Alert';



function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, mode) => {
    setAlert({
      msg: msg,
      mode: mode
    });
    setTimeout(() => setAlert(null), 2000);
  }
  return (
    <>
      <R>
        <Navbar />
        <div style={{ height: "30px", width: "100%" }}>
          <Alert alert={alert} />
        </div>
        <Routes>

          <Route element={<PrivateCom />}>
            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/AddProduct" element={<AddProduct showAlert={showAlert} />} />
            <Route path="/UpdateProduct/:id" element={<UpdateProduct showAlert={showAlert} />} />
            <Route path="/profile" element={<User showAlert={showAlert} />} />
          </Route>

          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </R>
    </>
  );
}

export default App;
