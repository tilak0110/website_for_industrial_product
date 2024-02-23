// // Feedback.js
// import React, { useState } from 'react';
// import StarRating from './StarRating'; // Assuming you have a StarRating component

// function Feedback() {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState('');

//   const handleRatingChange = (newRating) => {
//     setRating(newRating);
//   };

//   const handleCommentChange = (e) => {
//     setComment(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your submit logic here
//   };

//   return (
//     <div>
//       <h1>Feedback Form</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="comment">Feedback:</label>
//           <textarea id="comment" value={comment} onChange={handleCommentChange} />
//         </div>
//         <div>
//           <label>Rating:</label>
//           <StarRating count={5} value={rating} onChange={handleRatingChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Feedback;


import React, { useState } from "react";
import StarRating from "./Star"; // Assuming you have a StarRating component

function Feedback() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You can send the feedback data to the server here

    // For demonstration purposes, log the data to the console
    console.log("Rating:", rating);
    console.log("Comment:", comment);
//https://localhost:7170/api/Feedback/SetFeedback
//https://localhost:7170/api/Feedback/getFeedbacks
    // Redirect to thank you page after submitting feedback
    window.location.href = "/thank-you";
  };

  return (
    <div className="container">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment">Feedback:</label>
          <textarea
            className="form-control"
            id="comment"
            rows="3"
            value={comment}
            onChange={handleCommentChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Rating:</label>
          <StarRating
            count={5} // Number of stars
            value={rating}
            onChange={handleRatingChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Feedback;
