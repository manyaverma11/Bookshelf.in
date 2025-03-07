import { useState } from "react";

const BookRecommender = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const fetchRecommendations = async () => {
    const response = await fetch("http://127.0.0.1:8000/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: bookTitle }),
    });

    const data = await response.json();
    if (data.error) {
      alert(data.error);
    } else {
      setRecommendations(data.recommended_books);
    }
  };

  return (
    <div>
      <h2>Book Recommender</h2>
      <input
        type="text"
        placeholder="Enter book title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>

      <ul>
        {recommendations.map((book, index) => (
          <li key={index}>
            <b>{book.title}</b> (Distance: {book.distance.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookRecommender;
