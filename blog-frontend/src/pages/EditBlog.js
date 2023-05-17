import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const id = queryParameters.get("id");
  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("temitope")}`,
    };
    axios({
      method: "PUT",
      url: `http://localhost:8000/blog/${id}`,
      headers: headers,
      data: { title: title, body: body },
    })
      .then(function (response) {
        alert("blog successfully updated");
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("temitope")}`,
    };
    // console.log(headers);
    axios
      .get(`http://localhost:8000/blog/${id}`, { headers })
      .then((res) => {
        setTitle(res.data.title);
        setBody(res.data.body);
        // console.log(title,body)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
        <Paper sx={{ p: 2 , backgroundColor:"#f7f9fc"}}>
          <Typography variant="h4">Edit Blog</Typography>
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
              Update
            </Button>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export default EditBlog;
