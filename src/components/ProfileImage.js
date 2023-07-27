import React, { useState, useEffect } from 'react';
import avatar1 from '../avatar1.png';

const ProfileImage = (props) => {
    const [imgUrl, setImgUrl] = useState(null);

    const fetchProfileImage = async () => {
        let img = await fetch(`http://localhost:5000/api/auth/upload/${props.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "jw-token": localStorage.getItem('jw-token')
            }
        });
        const blob = await img.blob();
        if (blob.type !== 'application/json') {
            const url = URL.createObjectURL(blob);
            return setImgUrl(url);
        }
        return setImgUrl(avatar1)
    }


    useEffect(() => {
        fetchProfileImage();
        return () => URL.revokeObjectURL(imgUrl)
        // eslint-disable-next-line
    }, [props.id])


    return (
        <div className=''>
            <img className='img-thumbnail' style={{ cursor: "pointer" }} src={imgUrl} alt="Profile Avatar" onClick={() => document.getElementById("file").click()} title='Update Profile' />
        </div>

    )
}

export default ProfileImage
