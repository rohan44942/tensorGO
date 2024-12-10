
import { logoutFromGoogle } from "../services/authService";

function Logout() {
  return (
    <div className="mt-8 text-center">
      <button
        onClick={logoutFromGoogle}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
