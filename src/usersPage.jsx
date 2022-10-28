import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from '@mui/material/Button';
// import { LogoutIcon } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';

import './loginPage.css'
import { AppBar, Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";

export default function UsersPage() {
  const navigate = useNavigate()
  const { userspage } = useParams()
  const [userDatas, setUserDatas] = useState({});
  const [page, setPage] = useState(true);
  const [user, setUser] = useState({})

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  console.log('Params ', userspage);

  const fetchApi = () => {
    axios.get('https://reqres.in/api/users?page=1&per_page=12')
      .then((success) => setUser(success.data))
      .catch((failed) => console.log(failed))
  }
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

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    loadData()
    fetchApi()
  }, [])

  return (
    <div>
      <AppBar position='static'>
        {
          (user.data)?.filter((el) => el.email === userspage).map((el, index) => {
            return (
              <div key={index}>

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Tooltip title='view profile'>
                    <Avatar src={el.avatar} sx={{ marginLeft: 220, marginTop: 2, marginBottom: 2 }}></Avatar>
                  </Tooltip>
                </IconButton>



                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{el.first_name} {el.last_name} <br /> {el.email} <br />
                      <Button variant='text' size="small" onClick={signOut}><LogoutIcon /> Logout</Button> <br /> <br />
                    </Typography>
                  </MenuItem>

                </Menu>
                {/* <img src={el.avatar} alt='no preview'/> */}
                {/* <p>Name : {el.first_name}</p> */}
              </div>
            )
          })
        }
      </AppBar>

      {/* <div id="nav-bar">
                <Button variant="contained" size="small" onClick={signOut} id='btn'><LogoutIcon /> Logout</Button> <br /> <br />
            </div> */}
      {/* {
                (user.data)?.filter((el) => el.email === userspage).map((el,index)=>{
                    return(
                        <div key={index}>
                            <img src={el.avatar} alt='no preview'/>
                            <p>Name : {el.first_name}</p>
                            </div>
                    )
                })
            } */}
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