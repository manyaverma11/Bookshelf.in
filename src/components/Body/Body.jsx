import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Body.css";
import About from "../About/About";
import Products from "../Products/Products";

function Body() {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 12;

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q&orderBy=relevance&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      const data = await response.json();
      if (startIndex === 0) {
        setBooks(data.items);
      } else {
        setBooks((prevBooks) => [...prevBooks, ...data.items]);
      }
    } catch (error) {
      console.error("Error fetching book data:", error);
    }
  };

  const handleLoadMore = () => {
    setStartIndex((prevIndex) => prevIndex + maxResults);
  };

  const showMenu = () => {
    setToggle(!toggle);
    if (toggle === false) {
      setWidth("16%");
    } else {
      setWidth("0%");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [startIndex]);


  return (
    <section>
      <About showMenu={showMenu} count={count} />
      <main style={{ margin: "0 1rem" }}>
        <div className="row">
          {books.map((book, index) => (
            <Products key={index} book={book} />
          ))}
        </div>
      </main>
      <div className="loadMore">
        <Button
          className="loadMoreButton"
          type="button"
          onClick={handleLoadMore}
          variant="default"
          style={{ color: "white", background: "#81d1d4" }}
        >
          Load more
        </Button>
      </div>
    </section>
  );
}

export default Body;
