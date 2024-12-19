import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import StarIcon from '@material-ui/icons/Star';
import '../../App.css';

function Review() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('https://vacation-hut-0piq.onrender.com/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://vacation-hut-0piq.onrender.com/reviews', { rating, comment });
      fetchReviews();
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="center-alignrating">
    <div className="glass-containerreview">
    <h2 className="review-heading-align" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}>Customer Reviews</h2>
    <form onSubmit={submitReview}>
      <div className="glass-input-containerreview">
        <div className="center-alignrating">
          <Rating
            id="rating"
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            required
            icon={<StarIcon />}
            className="glass-ratingreview"
          />
        </div>
      </div>
  
      <div className="glass-input-container">
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="glass-textareareview"
        />
      </div>
  
      <div className="center-alignrating">
        <button type="submit" className="landbtn buttonfontfamily landbtnalign">
          Submit Review
        </button>
      </div>
    </form>
    {/* <h2>Reviews:</h2>
    {reviews.map((review) => (
      <div key={review._id}>
        <p>
          Rating: <Rating value={review.rating} icon={<StarIcon />} readOnly />
        </p>
        <p>Comment: {review.comment}</p>
      </div>
    ))} */}
  </div>
  </div>
  
  );
}

export default Review;
