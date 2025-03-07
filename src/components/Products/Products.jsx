import React from "react";
import { Card, Button } from "react-bootstrap";
import { useState } from "react";

function Products({ book }) {
  const [count, setCount] = useState(0);
  const { volumeInfo,saleInfo } = book;
  const { title, authors, imageLinks, pageCount } = volumeInfo;
  const price = saleInfo?.retailPrice?.amount 
        ? `${saleInfo.listPrice.amount}` 
        : "Not for Sale";

        const currencyCode = saleInfo?.retailPrice?.currencyCode 
        ? `${saleInfo.listPrice.currencyCode}` 
        : "";

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
            <p style={{ margin: "0" }}>Price: {currencyCode} {price}</p>
          </Card.Text>
          <div style={{ marginTop: "auto", textAlign: "center" }}>
            {/* Center the button horizontally */}
            <Button
              variant="default"
              style={{
                fontSize: "small",
                marginRight: "auto",
                marginLeft: "auto",
                backgroundColor: "black",
                color: "white",
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
}

export default Products;
