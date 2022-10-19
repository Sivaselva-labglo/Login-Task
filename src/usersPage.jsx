import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';

import './loginPage.css'

export default function UsersPage() {
  const [userDatas, setUserDatas] = useState({});
  const [page, setPage] = useState(true);

  const navigate = useNavigate()

  function loadData() {
    axios.get('https://reqres.in/api/login')
      .then((success) => setUserDatas(success.data))
      .catch((failed) => console.log(failed))
  }

  function nxtPage() {
    axios('https://reqres.in/api/unknown?page=2')
      .then((success) => setUserDatas(success.data))
      .catch((failed) => console.log('Failed to get Datas ', failed))

    setPage(false)
  }

  function previousPage() {
    axios('https://reqres.in/api/unknown?page=1')
      .then((success) => setUserDatas(success.data))
      .catch((failed) => console.log('Failed to get Datas ', failed))

    setPage(true)
  }

  function signOut(e) {
    e.preventDefault()
    localStorage.clear("token")
    navigate('/')
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div id="btn">
        <Button variant="contained" onClick={signOut}>Logout</Button> <br /> <br />
      </div>
      {
        (userDatas.data)?.map((entities, index) => {
          return (
            <center key={index}>
              <div id="card">
                <p id="entity">Id : {entities.id}</p>
                <p id="entity">Name : {entities.name}</p>
                <p id="entity">Year : {entities.year}</p>
                <p id="entity">Color : {entities.Color}</p>
                <p id="entity">Pantone_value : {entities.pantone_value}</p>
              </div>
            </center>
          )
        })
      }
      <center>
        {
          (page)
            ? <button onClick={nxtPage}>Next Page</button>
            : <button onClick={previousPage}>Previous Page</button>
        }
      </center>
    </div >
  )
}