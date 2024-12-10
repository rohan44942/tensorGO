import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const email = params.get("email");
    const name = params.get("name");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      setIsAuthenticated(true);
    }
  }, []);

  const token = localStorage.getItem("token");

  return <>{isAuthenticated || token ? <Dashboard /> : <Login />}</>;
}

export default App;
