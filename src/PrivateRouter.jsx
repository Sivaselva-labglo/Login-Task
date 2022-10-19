import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }) {
  const token = localStorage.getItem("token")
  return (
    <div>
      {
        (token) ? children : <Navigate to='/' />
      }
    </div>
  )
}