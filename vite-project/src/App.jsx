
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Basket from "./pages/Basket";

const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthGuard> 
          <Home/>
        </AuthGuard>} />

        <Route path="/profile" element={<AuthGuard> 
          <UserProfile/>
        </AuthGuard>} />

        <Route path="/basket" element={<AuthGuard> 
          <Basket/>
        </AuthGuard>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
