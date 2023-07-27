import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateCom() {
    const user = localStorage.getItem("jw-token");
  return (user)?<Outlet/>:<Navigate to="/login" />
}

export default PrivateCom
