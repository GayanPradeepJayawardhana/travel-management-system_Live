import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Header from "./components/Header.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <div className="page-header">
          <h1>✈️ Travel Management System</h1>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === "admin" ? "/admin" : "/user"} />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === "admin" ? "/admin" : "/user"} />} />
          <Route path="/user" element={user && user.role === "user" ? <UserDashboard /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user && user.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;