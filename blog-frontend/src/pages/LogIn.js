import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";
import { setToken } from "../Auth";
const LogIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username,password)
    var bodyFormData = new FormData();
    bodyFormData.append('username', username)
    bodyFormData.append('password', password)
    axios({
      method: "POST",
      url: "http://localhost:8000/login",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data",  },
    })
    .then(function (response) {
      if (response.status == 200){
        // console.log(response.data.access_token)
        setToken(response.data.access_token)
        navigate('/blogs')
      }
    })
    .catch(function (error) {
      alert("Invalid credentials")
    });
  };


  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Paper sx={{ p: 2 , backgroundColor:"#f7f9fc"}}>
        <Typography variant="h4">
          Log In
        </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "50ch" },
          }}
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <br></br>
            <TextField
              required
              type="password"
              id="outlined-required"
              label="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button variant="contained"
          type="submit"
          >Login</Button>
        </Box>
      </Paper>
    </div>
  );
};

export default LogIn;
