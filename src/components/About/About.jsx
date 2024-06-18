import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import "../About/About.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const About = ({ showMenu, count }) => {
  return (
    <div>
      <div>
        <Carousel>
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
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Form inline>
          <Row>
            <Col xs="auto" style={{ width: "50vw" }}>
              <Form.Control
                type="text"
                placeholder="Enter the name of the book!"
                className="mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">Search</Button>
            </Col>
            <Col xs="auto">
              <DropdownButton id="dropdown-basic-button" title="Filters">
                <Dropdown.Item href="#/action-1">Bestselling</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Price: Low to High</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Price: High to Low</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Publication Date (Latest)</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Publication Date (Oldest)</Dropdown.Item>
              </DropdownButton>
            </Col>
            <Col xs="auto">
              <Button className="myCart" onClick={showMenu}>
                My Cart ({count})
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default About;
