import React, { useState, useEffect } from 'react'
import ProfileImage from './ProfileImage'

function User(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            let data = await fetch("http://localhost:5000/api/auth/getuser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "jw-token": localStorage.getItem("jw-token")
                }
            })
            if (!data.ok) {
                throw new Error("Failed to fetch user data");
            }

            data = await data.json();
            setName(data.name);
            setEmail(data.email);
            setId(data._id);

        } catch (err) {
            console.log(err);
        }
    }


    const handleFileChanges = (event) => {
        let img = event.target.files[0]
        let reader = new FileReader();

        reader.onload = function (event) {
            let imgFile = document.getElementById("img");
            if (imgFile) {
                imgFile.src = event.target.result;
            }
        }
        reader.readAsDataURL(img)
        setSelectedFile(img)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();

        let formData = new FormData()
        formData.append("profilePhoto", selectedFile)

        await fetch("http://localhost:5000/api/auth/upload", {
            method: "POST",
            body: formData,
            headers: {
                "jw-token": localStorage.getItem("jw-token")
            }
        })
    }


    return (
        <div style={{ width: "100%", position: "relative" }}>

            <div className="card" style={{ width: "20rem", position: "absolute", left: "35%", top: "80%" }}>
                {
                    (selectedFile) ? <img id="img" src="" alt="" onClick={() => document.getElementById("file").click()} />
                        : <ProfileImage id={id} />
                }
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input className='d-none' type="file" name="profilePhoto" id='file' onChange={(e) => { handleFileChanges(e) }} />
                    <button type='submit' className={`mt-1 float-right btn btn-success ${!selectedFile ? "invisible" : "visible"}`}>Upload</button>
                </form>

                <div className="card-body">
                    <h5 className="card-title">Name - {name}</h5>
                    <h5 className="card-text">Email - {email}</h5>
                </div>
            </div>
        </div>
    )
}

export default User
