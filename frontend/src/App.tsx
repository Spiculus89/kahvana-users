import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UsersPage from "./components/UsersPage";
import UserDetailsPage from "./components/UserDetailsPage";
import CreateUserPage from "./components/CreateUserPage";

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/create" element={<CreateUserPage />} />
          <Route path="/edit/:id" element={<UserDetailsPage />} />
        </Routes>
    </Router>
  );
}

export default App;
