// // import { useEffect, useState } from "react";

// // const RequestsPage = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [category, setCategory] = useState("General Queries");
// //   const handleChange = (e) => setCategory(e.target.value);
// //   useEffect(() => {
// //     const fetchRequests = async () => {
// //       try {
// //         const response = await fetch(
// //           `http://localhost:5000/api/customer-service/retrieve?category=${category}`,
// //           {
// //             method: "GET",
// //           }
// //         );
// //         if (!response.ok) {
// //           throw new Error("Failed to fetch customer service requests");
// //         }
// //         const data = await response.json();
// //         console.log(data);
// //         setRequests(data.data); // Assuming the API response includes a `data` array
// //       } catch (error) {
// //         console.error("Error fetching customer service requests:", error);
// //       }
// //     };
// //     fetchRequests();
// //   }, [category]);

// //   return (
// //     <div className="bg-gray-50 p-6">
// //       <h2 className="text-3xl font-bold text-blue-600 mb-4">
// //         Customer Service Requests
// //       </h2>
// //       <select
// //         value={category}
// //         className="mb-4 p-2 border rounded-lg"
// //         onChange={handleChange}
// //       >
// //         <option>General Queries</option>
// //         <option>Product Features Queries</option>
// //         <option>Product Pricing Queries</option>
// //         <option>Product Feature Implementation Requests</option>
// //       </select>
// //       <div>
// //         {/* {requests.map((req) => (
// //           <div key={req.id} className="p-4 mb-4 bg-white shadow rounded-lg">
// //             <h3 className="font-bold text-gray-800">
// //               {req.title || "No Title"}
// //             </h3>
// //             <p className="text-gray-600">{req.body || "No Body Content"}</p>
// //           </div>
// //         ))} */}
// //         {requests}
// //       </div>
// //     </div>
// //   );
// // };

// // export default RequestsPage;

// import { useState } from "react";

// const RequestsPage = () => {
//   const [requests, setRequests] = useState([]);
//   const [category, setCategory] = useState("General Queries");

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/customer-service/retrieve?category=${category}`,
//         {
//           method: "GET",
//         }
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch customer service requests");
//       }
//       const data = await response.json();
//       setRequests(data.data); // Update the requests state with the response
//     } catch (error) {
//       console.error("Error fetching customer service requests:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-50 p-6">
//       <h2 className="text-3xl font-bold text-blue-600 mb-4">
//         Customer Service Requests
//       </h2>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="mb-4 p-2 border rounded-lg"
//         >
//           <option>General Queries</option>
//           <option>Product Features Queries</option>
//           <option>Product Pricing Queries</option>
//           <option>Product Feature Implementation Requests</option>
//         </select>
//         <button
//           type="submit"
//           className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//         >
//           Fetch Requests
//         </button>
//       </form>
//       <div>
//         {requests.map((req) => (
//           <div key={req.id} className="p-4 mb-4 bg-white shadow rounded-lg">
//             <h3 className="font-bold text-gray-800">
//               {req.title || "No Title"}
//             </h3>
//             <p className="text-gray-600">Category: {req.category}</p>
//             <p className="text-gray-600">Comments: {req.comments}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RequestsPage;
import { useState } from "react";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [category, setCategory] = useState("General Queries");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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
      setError(
        "Error fetching customer service requests. Please try again.",
        error
      );
    } finally {
      setLoading(false);
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
          className="mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option>General Queries</option>
          <option>Product Features Queries</option>
          <option>Product Pricing Queries</option>
          <option>Product Feature Implementation Requests</option>
        </select>

        <button
          type="submit"
          className={`p-2 bg-blue-600 text-white rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Requests"}
        </button>
      </form>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div>
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.id} className="p-4 mb-4 bg-white shadow rounded-lg">
              <h3 className="font-bold text-gray-800">
                {req.title || "No Title"}
              </h3>
              <p className="text-gray-600">Category: {req.category}</p>
              <p className="text-gray-600">Comments: {req.comments}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No requests found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
