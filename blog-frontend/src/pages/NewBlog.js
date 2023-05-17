import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("temitope")}`,
    };
    axios({
      method: "POST",
      url: "http://localhost:8000/blog",
      headers: headers,
      data: { title: title, body: body },
    })
      .then(function (response) {
        alert("blog successfully created");
        setBody("")
        setTitle("")
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Paper sx={{ p: 2, backgroundColor:"#f7f9fc" }}>
          <Typography variant="h4">New Blog</Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "70ch" },
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <br></br>
              <TextField
                required
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={10}
                placeholder="Blog Body"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </div>
            <Button variant="contained" type="submit">
              Create
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export default NewBlog;
