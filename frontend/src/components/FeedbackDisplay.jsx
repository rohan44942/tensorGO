import { useEffect, useState } from 'react';
import { retrieveFeedback } from '../services/feedbackService';

function FeedbackDisplay() {
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    async function fetchFeedback() {
      try {
        const data = await retrieveFeedback();
        setFeedback(data);
      } catch {
        setFeedback({});
      }
    }
    fetchFeedback();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-4">Aggregated Feedback</h2>
      {feedback ? (
        Object.keys(feedback).map((category) => (
          <div key={category} className="mb-4">
            <h3 className="font-bold">{category}</h3>
            {feedback[category].map((item, index) => (
              <p key={index}>{item.comments}</p>
            ))}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FeedbackDisplay;
