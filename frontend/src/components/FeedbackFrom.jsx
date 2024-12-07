import  { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';

function FeedbackForm() {
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFeedback({ category, rating, comments });
      setMessage('Feedback submitted successfully');
    } catch {
      setMessage('Error submitting feedback');
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="block w-full mb-4 border rounded"
        >
          <option value="">Select a category</option>
          <option value="Product Features">Product Features</option>
          <option value="Product Pricing">Product Pricing</option>
          <option value="Product Usability">Product Usability</option>
        </select>

        <label>Rating</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="block w-full mb-4 border rounded"
        />

        <label>Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="block w-full mb-4 border rounded"
        />

        <button className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

export default FeedbackForm;
