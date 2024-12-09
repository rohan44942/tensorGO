// import { useEffect, useState } from "react";

// const RequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [category, setCategory] = useState("General Queries");
//   const handleChange = (e) => setCategory(e.target.value);
//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/customer-service/retrieve?category=${category}`,
//           {
//             method: "GET",
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch customer service requests");
//         }
//         const data = await response.json();
//         console.log(data);
//         setRequests(data.data); // Assuming the API response includes a `data` array
//       } catch (error) {
//         console.error("Error fetching customer service requests:", error);
//       }
//     };
//     fetchRequests();
//   }, [category]);

//   return (
//     <div className="bg-gray-50 p-6">
//       <h2 className="text-3xl font-bold text-blue-600 mb-4">
//         Customer Service Requests
//       </h2>
//       <select
//         value={category}
//         className="mb-4 p-2 border rounded-lg"
//         onChange={handleChange}
//       >
//         <option>General Queries</option>
//         <option>Product Features Queries</option>
//         <option>Product Pricing Queries</option>
//         <option>Product Feature Implementation Requests</option>
//       </select>
//       <div>
//         {/* {requests.map((req) => (
//           <div key={req.id} className="p-4 mb-4 bg-white shadow rounded-lg">
//             <h3 className="font-bold text-gray-800">
//               {req.title || "No Title"}
//             </h3>
//             <p className="text-gray-600">{req.body || "No Body Content"}</p>
//           </div>
//         ))} */}
//         {requests}
//       </div>
//     </div>
//   );
// };

// export default RequestsPage;

import { useState } from "react";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [category, setCategory] = useState("General Queries");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const response = await fetch(
        `http://localhost:5000/api/customer-service/retrieve?category=${category}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch customer service requests");
      }
      const data = await response.json();
      setRequests(data.data); // Update the requests state with the response
    } catch (error) {
      console.error("Error fetching customer service requests:", error);
    }
  };

  return (
    <div className="bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">
        Customer Service Requests
      </h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 p-2 border rounded-lg"
        >
          <option>General Queries</option>
          <option>Product Features Queries</option>
          <option>Product Pricing Queries</option>
          <option>Product Feature Implementation Requests</option>
        </select>
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Fetch Requests
        </button>
      </form>
      <div>
        {requests.map((req) => (
          <div key={req.id} className="p-4 mb-4 bg-white shadow rounded-lg">
            <h3 className="font-bold text-gray-800">
              {req.title || "No Title"}
            </h3>
            <p className="text-gray-600">Category: {req.category}</p>
            <p className="text-gray-600">Comments: {req.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsPage;
