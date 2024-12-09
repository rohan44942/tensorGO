import RequestsPage from "./RequestPage";
import CustomerServiceForm from "../services/CustomerServiceForm";
function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <RequestsPage />
      <CustomerServiceForm />
    </div>
  );
}

export default Dashboard;
