import { useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App(){
  useEffect(() => {

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const email = params.get("email");
    const name = params.get("name");

    console.log(token, name);

 
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
    }
  }, []);

  const token = localStorage.getItem("token");

  return <>{token ? <Dashboard /> : <Login />}</>;
}

export default App;
