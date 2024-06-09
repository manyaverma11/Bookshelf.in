import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <div className="searchBar" style={{display:'flex', justifyContent:'center'}}>
      <Form inline>
        <Row>
          <Col xs="auto" style={{width:'50vw'}}>
            <Form.Control
              type="text"
              placeholder="Enter the name of the book!"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default About;
