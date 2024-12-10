import RequestsPage from "./RequestPage";
import CustomerServiceForm from "../services/CustomerServiceForm";
import Logout from "./Logout";
// import DeleteUser from "./DeleteUser";
// import DeleteConversation from "./DeleteConversation";

function Dashboard() {
  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-white min-h-screen font-sans  bg-red-600">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600">
            Submit Your Request
          </h2>
          <CustomerServiceForm />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-600">Your Requests</h2>
          <RequestsPage />
        </div>

        <div className="flex justify-center">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
