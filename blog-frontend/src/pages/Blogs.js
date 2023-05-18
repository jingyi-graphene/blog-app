import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/NavBar";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Pagination,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [myState, setMystate] = useState(true);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("temitope")}`,
  };
  const readBlog = (id) => {
    navigate(`/indiv_blog?id=${id}`);
  };

  const deleteBlog = (id) => {
    axios
      .delete(`http://localhost:8000/blog/${id}`, { headers })
      .then(() => {
        setMystate(!myState);
        alert(`Blog with id ${id} has been deleted`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createBlog = () => {
    navigate("/create_blog");
  };

  const [page, setPage] = useState(1)
  const cardPerPage = 6
  const lastCard = page* cardPerPage
  const firstCard = lastCard-cardPerPage
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  useEffect(() => {
    // console.log(headers);
    axios
      .get(`http://localhost:8000/blog`, { headers })
      .then((res) => {
        // console.log(res.data);
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [myState, page]);
  return (
    <div>
      <ResponsiveAppBar />
      <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ height: 40, marginRight: "40px" }}
          onClick={() => createBlog()}
        >
          New
        </Button>
      </Box>
      <div style={{ margin: 40 }}>
        <Grid container spacing={2}>
          {blogs.slice(firstCard, lastCard).map((blog) => (
            <Grid item xs={6} key={blog.id}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical",
                    }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {blog.body}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button variant="text" onClick={() => readBlog(blog.id)}>
                    Read More
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    onClick={() => deleteBlog(blog.id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <Box
        sx={{
          margin: "auto",
          width: "fit-content",
          alignItems: "center",
        }}
      >
        <Pagination count={Math.ceil(blogs.length/cardPerPage)} page={page} onChange={handlePageChange} />
      </Box>
    </div>
  );
};

export default Blogs;
