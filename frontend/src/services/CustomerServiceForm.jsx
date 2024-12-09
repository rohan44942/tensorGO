import { useState } from "react";

const CustomerServiceForm = () => {
  const [category, setCategory] = useState("General Queries");
  const [comments, setComments] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Retrieve user information from localStorage
      const userId = localStorage.getItem("userId"); 
      const email = localStorage.getItem("email");
      const name = localStorage.getItem("name");
      console.log("from frontend ",userId, email, name);

      if (!userId || !email || !name) {
        alert("User information is missing. Please log in again.");
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
        const data = await response.json();
        console.log("data is this -->", data);
        alert("Request submitted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error submitting request:", errorData);
        alert("Failed to submit request. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit request. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Customer Service Request
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-gray-700">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded-lg"
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
          className="w-full mb-4 p-2 border rounded-lg"
          rows="4"
        ></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerServiceForm;
