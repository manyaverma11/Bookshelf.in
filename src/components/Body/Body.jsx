import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Body.css";

function Body() {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [width, setWidth] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResults] = useState(10);

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=science%20fiction&startIndex=${startIndex}&maxResults=${maxResults}`
      );
      const data = await response.json();
      setBooks((prevBooks) => [...prevBooks, ...data.items]);
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
        <Card
          style={{
            width: "20rem",
            height: "20rem",
            display: "flex",
            alignItems: "center",
          }}
        >
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
          <Card.Body
            style={{
              height: "20rem",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Card.Title
              style={{ fontSize: "large", margin: "0" }}
              className="truncate-text"
            >
              {title}
            </Card.Title>
            <Card.Text style={{ fontSize: "small", margin: "0" }}>
              <p style={{ fontSize: "small", margin: "0" }}>
                By {authors ? authors.join(", ") : "Unknown Author"}
              </p>
              <p style={{ fontSize: "small", margin: "0" }}>
                Price: ${pageCount / 10}
              </p>
            </Card.Text>
            <Button
              style={{
                fontSize: "small",
                margin: "0",
                justifyContent: "flex-end",
              }}
              className="cartButton"
              onClick={() => setCount(count + 1)}
            >
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };

  return (
    <section>
        <div className="navBar">
        <div className="profile">
          <div className="profileName">Profile Name</div>
          <button className="myCart" onClick={showMenu}>
            My Cart ({count})
          </button>
        </div>
      </div>
      <main style={{margin: '0 1rem'}}>
        <div className="leftSideBar">
          <button className="filters">Filters</button>
          <button className="genre">Genre</button>
          <button className="publications">Publications</button>
        </div>
        <div className="row">
          {books.map((book, index) => (
            <Products key={index} book={book} />
          ))}
        </div>
        <div className="rightSideBar" style={{ width }}>
          <div className="cartTop">
            <div className="cartSymbol">
              <ion-icon
                name="cart-outline"
                size="large"
                color="#3a3a3a"
              ></ion-icon>
            </div>
            <div className="cartHeading">Cart</div>
            <div className="cartCount">({count})</div>
          </div>
        </div>
      </main>
      <div className="loadMore">
        <button
          className="loadMoreButton"
          type="button"
          onClick={handleLoadMore}
        >
          Load more
        </button>
      </div>
      <div className="footer">
        <div className="contact">
          <div className="contactHeading">Contact</div>
          <div className="socialIcons">
            <a href="https://github.com/manyaverma11">
              <ion-icon
                name="logo-github"
                size="large"
                className="git"
                style={{ color: "#fff", margin: "0 16px 0 0" }}
              ></ion-icon>
            </a>
            <a href="https://www.linkedin.com/in/manyaverma11/">
              <ion-icon
                name="logo-linkedin"
                size="large"
                className="linkedin"
                style={{ color: "#fff", margin: "0 16px 0 0" }}
              ></ion-icon>
            </a>
            <a href="mailto:manyaverma0154@gmail.com">
              <ion-icon
                name="mail-outline"
                size="large"
                className="mail"
                style={{ color: "#fff" }}
              ></ion-icon>
            </a>
          </div>
        </div>
        <p className="copyright">
          <a href="https://manyaverma11.github.io/Portfolio/">
            Built by Manya Verma | Copyrights ©2024.
          </a>
        </p>
      </div>
    </section>
  );
}

export default Body;
