import { loginWithGoogle } from "../services/authService";

function Login() {
  return (
    <div className="h-screen flex items-center justify-center bg-blue-500">
      <button
        className="bg-white text-blue-500 font-bold py-3 px-6 rounded hover:bg-gray-100"
        onClick={loginWithGoogle}
      >
        Login with Google
      </button>
    </div>
  );
}

export default Login;
