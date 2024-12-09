import { useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  useEffect(() => {
    // Extract token and userId from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const email = params.get("email");
    const name = params.get("name");

    console.log(token,name);

    // Store the details in localStorage
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
    }
  }, []); // Runs only once when the component is mounted

  const token = localStorage.getItem("token");

  return <>{token ? <Dashboard /> : <Login />}</>;
}

export default App;
