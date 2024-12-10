import { useState } from "react";

const CustomerServiceForm = () => {
  const [category, setCategory] = useState("General Queries");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const [error, setError] = useState(""); // New state for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const userId = localStorage.getItem("userId");
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");

      if (!userId || !email || !name) {
        alert("User information is missing. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/customer-service/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            email,
            name,
            category,
            comments,
          }),
        }
      );

      if (response.ok) {
        // const data = await response.json();
        alert("Request submitted successfully!");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Failed to submit request. Please try again."
        );
      }
    } catch (error) {
      setError("Failed to submit request. Please try again.", error);
    } finally {
      setLoading(false); // Disable loading spinner after request completes
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Customer Service Request
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option>General Queries</option>
          <option>Product Features Queries</option>
          <option>Product Pricing Queries</option>
          <option>Product Feature Implementation Requests</option>
        </select>

        <label className="block mb-2 text-gray-700">Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className={`w-full py-2 bg-blue-600 text-white rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CustomerServiceForm;
