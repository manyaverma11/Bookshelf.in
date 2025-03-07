import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import "../About/About.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState, useEffect } from "react";
import Products from "../Products/Products";

const About = ({ showMenu, count }) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {

    if (!query.trim()) {
      if(books){
        setBooks([]);
      }
      console.error("Search query is empty!");
      return;
    }

    console.log("Fetching books for:", query); 

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );

      const data = await response.json();

      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
        console.warn("No books found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Stops form from refreshing page
    searchBooks();
  };

  return (
    <div>
      <div>
        <Carousel id="home">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/bookLogo3.jpeg`}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Bookshelf.in</h3>
              <h5>
                Discover a world of knowledge and adventure at Bookshelf.in,
                where every book is a new journey waiting to be explored.
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/bookLogo2.jpeg`}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>
                Shop at Bookshelf.in and enjoy exclusive discounts on the latest
                bestsellers and timeless classics delivered right to your
                doorstep!
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`${process.env.PUBLIC_URL}/bookLogo1.jpeg`}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>
                Discover your next read from over 15 million books available on
                our online bookstore, powered by the Google Books API!
              </h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div
        className="searchBar"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Form inline={true} onSubmit={handleSubmit}>
          <Row>
            <Col xs="auto" className="input-col1" style={{ width: "50vw" }}>
              <Form.Control
                type="text"
                placeholder="Enter the name of the book!"
                className="mr-sm-2 form-control"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Col>

            <Col xs="auto">
              <Button
                type="submit"
                variant="default"
                style={{ color: "black", background: "white", border: "1px solid black" }}
                onClick={searchBooks}
              >
                Search
              </Button>
            </Col>

            <Col xs="auto">
              <Button
                className="myCart"
                onClick={showMenu}
                variant="default"
                style={{ color: "black", background: "white", border: "1px solid black" }}
              >
                My Cart ({count})
              </Button>
            </Col>
            <Col xs="auto">
              <DropdownButton
                id="dropdown-basic-button"
                title="Filters"
                variant="default"
                style={{ color: "white", background: "black" }}              >
                <Dropdown.Item href="#/action-1">Bestselling</Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  Price: High to Low
                </Dropdown.Item>
                <Dropdown.Item href="#/action-4">
                  Publication Date (Latest)
                </Dropdown.Item>
                <Dropdown.Item href="#/action-5">
                  Publication Date (Oldest)
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Form>
      </div>
      <main style={{ margin: "0 1rem" }}>
        <div className="row">
          {books.map((book, index) => (
            <Products key={index} book={book} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default About;
