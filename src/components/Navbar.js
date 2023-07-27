import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('jw-token');
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/AddProduct">AddProduct</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="">UpdateProduct</Link>
                        </li>

                    </ul>

                    {
                        !localStorage.getItem("jw-token") ? <form className="form-inline my-2 my-lg-0">
                            <Link to="/login" className="btn btn-primary mx-2">Login</Link>
                            <Link to="/signup" className="btn btn-primary">Signup</Link>
                        </form>
                            : <form className="form-inline my-2 my-lg-0">
                                <Link to="/profile" className="btn btn-primary">Profile</Link>
                                <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>
                            </form>
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar
