import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Registration from "./Registration";
import NotFound from "./NotFound";
import NoteList from "./NoteList";
import CreateNote from "./CreateNote";
import EditNote from "./EditNote";
import ViewNote from "./ViewNote";
import Footer from "./Footer";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users || []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleUserLogin = (user) => {
    setCurrentUser(user);
    setLoggedIn(true);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return (
    <Router>
      <div>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route
          path="/registration"
          element={<Registration handleUserLogin={handleUserLogin} />}
        />
        <Route path="/login" element={<Login handleUserLogin={handleUserLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/notes"
          element={<NoteList users={users} currentUser={currentUser} />}
        />
        <Route
          path="/createnote"
          element={<CreateNote currentUser={currentUser} />}
        />
        <Route
          path="/notes/edit/:id"
          element={<EditNote currentUser={currentUser} />}
        />
        <Route
          path="/notes/view/:id"
          element={<ViewNote currentUser={currentUser} />}
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
