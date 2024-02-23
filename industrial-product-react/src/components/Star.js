// StarRating.js
import React from 'react';

function StarRating({ count, value, onChange }) {
  const stars = Array.from({ length: count }, (_, index) => index + 1);

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          style={{ cursor: 'pointer', color: star <= value ? 'gold' : 'gray' }}
          onClick={() => onChange(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
}

export default StarRating;
