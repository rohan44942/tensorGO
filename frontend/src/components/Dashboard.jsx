import RequestsPage from "./RequestPage";
import CustomerServiceForm from "../services/CustomerServiceForm";
import Logout from "./Logout";
// import DeleteUser from "./DeleteUser";
function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <RequestsPage />
      <CustomerServiceForm />
      {/* <DeleteConversation />
      <DeleteUser /> */}
      <Logout />
    </div>
  );
}

export default Dashboard;
