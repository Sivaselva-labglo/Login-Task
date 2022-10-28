import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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
      .then((success) => {
        localStorage.setItem('token', success.data.token)
        navigate(`/${userCredentials.email}`)
      })
      .catch((error) => setErrormsg(error.response.data.error))
  }

  return (
    <div>
      <center>
        <div className="box">
          <form>
            <label>Email</label>
            <br />
            <TextField required type='email' name='email' onChange={saveCredentials} placeholder='enter email' label="email" />
            <br /><br />
            <label>Password</label>
            <br />
            <TextField required type='password' name='password' onChange={saveCredentials} placeholder='enter password' label="password" />
            <br /><br />
            <Button variant="contained" onClick={(e) => signIn(e)}>Login</Button> <br /> <br />
          </form>
          <p>{errormsg}</p>
        </div>
      </center>
    </div>
  )
}