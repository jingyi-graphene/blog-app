import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const IndivBlog = () => {
  const [blog, setBlog] = useState("");
  const [creator, setCreator] = useState("");
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const id = queryParameters.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("temitope")}`,
    };
    // console.log(headers);
    axios
      .get(`http://localhost:8000/blog/${id}`, { headers })
      .then((res) => {
        setBlog(res.data);
        setCreator(res.data.creator.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editBlog = (id) => {
    navigate(`/edit_blog?id=${id}`);
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h1>{blog.title}</h1>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <h5>
            <AccountCircleIcon />
            Creator: {creator}
          </h5>
          <Button color="warning" onClick={() => editBlog(blog.id)}>
            Edit
          </Button>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Paper sx={{ padding: "40px", width: "80%" }}>
            <Typography>{blog.body}</Typography>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default IndivBlog;
