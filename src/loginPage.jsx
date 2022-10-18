import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './loginPage.css'

export default function LoginPage() {
  const [userCredentials, setUserCredentials] = useState({});
  const [errormsg, setErrormsg] = useState('');

  const navigate = useNavigate();

  function saveCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value })
  }

  function signIn(e) {
    e.preventDefault()
    axios.post('https://reqres.in/api/login', userCredentials)
      .then((success) => navigate(`/${success.data}`))
      .catch((error) => setErrormsg(error.response.data.error))
  }

  return (
    <div>
      <center>
        <div className="box">
          <form>
            <label>Email</label>
            <br />
            <input type='email' name='email' onChange={saveCredentials} placeholder='enter email' required />
            <br /><br />
            <label>Password</label>
            <br />
            <input type='password' name='password' onChange={saveCredentials} placeholder='enter password' required />
            <br /><br />
            <button type="submit" onClick={(e) => signIn(e)}>Login</button>
          </form>
          <p>{errormsg}</p>
        </div>
      </center>
    </div>
  )
}