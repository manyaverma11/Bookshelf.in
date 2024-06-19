import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Body.css";
import About from "../About/About";

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
        `https://www.googleapis.com/books/v1/volumes?q=search+terms&startIndex=${startIndex}&maxResults=${maxResults}`
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

  const Products = ({ book }) => {
    const { volumeInfo } = book;
    const { title, authors, imageLinks, pageCount } = volumeInfo;

    return (
      <div className="cardContainer col-lg-3 col-md-6 mb-4">
        <Card style={{ width: "20rem", height: "20rem" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card.Img
              variant="top"
              src={imageLinks?.thumbnail}
              alt={title}
              style={{
                height: "10rem",
                padding: "1rem 1rem 0 1rem",
                width: "10rem",
              }}
            />
          </div>
          <Card.Body style={{ display: "flex", flexDirection: "column" }}>
            <Card.Title
              style={{ fontSize: "large", marginBottom: "0" }}
              className="truncate-text"
            >
              {title}
            </Card.Title>
            <Card.Text style={{ fontSize: "small", marginTop: "auto" }}>
              <p style={{ margin: "0" }} className="truncate-text-author">
                By {authors ? authors.join(", ") : "Unknown Author"}
              </p>
              <p style={{ margin: "0" }}>
                Price: ${(pageCount / 10).toFixed(2)}
              </p>
            </Card.Text>
            <div style={{ marginTop: "auto", textAlign: "center" }}>
              {/* Center the button horizontally */}
              <Button
                variant="default"
                style={{
                  fontSize: "small",
                  marginRight: "auto",
                  marginLeft: "auto",
                  backgroundColor:'silver',
                  color:'white'
                }}
                className="button-38"
                onClick={() => setCount(count + 1)}
              >
                Add to Cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  };

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
          style={{ color: "white", background: "silver" }}
        >
          Load more
        </Button>
      </div>
    </section>
  );
}

export default Body;
