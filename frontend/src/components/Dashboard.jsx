
import FeedbackForm from "./FeedbackFrom";
import FeedbackDisplay from "./FeedbackDisplay";

function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <FeedbackForm />
      <FeedbackDisplay />
    </div>
  );
}

export default Dashboard;
