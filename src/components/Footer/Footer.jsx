import React from "react";

const Footer = () => {
  return (
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
  );
};

export default Footer;
