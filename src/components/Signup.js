import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Signup(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleSingup = async () => {
        if (name && email && password) {
            let data = await fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                body: JSON.stringify({ name: name, email: email, password: password }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            data = await data.json();
            if (data) {
                localStorage.setItem("jw-token", data)
                navigate("/")
                props.showAlert(`Account created successfully`, "success")
            } else {
                alert(data.error)
            }
        } else {
            props.showAlert("All fields are required", "warning")
        }
    }

    return (
        <>
            <div className='container my-2'>
                <div className='container'>
                    <form className='container'>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} id="name" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email address</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} id="email" className="form-control" />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} id="password" className="form-control" />
                        </div>

                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center"></div>
                        </div>


                        <button type="button" onClick={handleSingup} className="btn btn-primary btn-block mb-4">SignUp</button>


                        <div className="text-center">
                            <p>Already have a Account? <Link to="/login">Login</Link></p>
                            <p>or Login with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
