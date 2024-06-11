import React from "react";
import "./Footer.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaLinkedin } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="footer">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand style={{ display: "flex" }}>
            Contact |
            <div className="socialIcons">
              <a href="https://github.com/manyaverma11">
                <BsGithub />
              </a>
              <a href="https://www.linkedin.com/in/manyaverma11/">
                <FaLinkedin />
              </a>
              <a href="mailto:manyaverma0154@gmail.com">
                <MdEmail />
              </a>
            </div>
          </Navbar.Brand>
          <a
            href="https://manyaverma11.github.io/Portfolio/"
            className="copyright"
          >
            Built by Manya Verma | Copyrights ©2024.
          </a>
        </Container>
      </Navbar>
    </div>
  );
};

export default Footer;
