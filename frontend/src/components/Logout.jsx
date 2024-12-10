import { logoutFromGoogle } from "../services/authService";
function Logout() {
    return (
        <div>
            <button onClick={logoutFromGoogle}>logout</button>
        </div>
    )
}

export default Logout
