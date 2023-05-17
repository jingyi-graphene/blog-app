import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LogIn";
import { RequireToken } from "./Auth";
import Blogs from "./pages/Blogs";
import IndivBlog from "./pages/IndivBlog";
import NewBlog from "./pages/NewBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route
          path="/blogs"
          element={
            <RequireToken>
              <Blogs />
            </RequireToken>
          }
        />
        <Route
          path="/indiv_blog"
          element={
            <RequireToken>
              <IndivBlog />
            </RequireToken>
          }
        />
        <Route
          path="/create_blog"
          element={
            <RequireToken>
              <NewBlog />
            </RequireToken>
          }
        />
        <Route
          path="/edit_blog"
          element={
            <RequireToken>
              <EditBlog />
            </RequireToken>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
