import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-primary fixed-bottom">
      <div className="footer__made-by">Made by Miken</div>
      <div className="footer__social-links">
        <a
          href="https://twitter.com/mikenprajapati"
          target="_blank"
          title="Twitter"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://github.com/mikenindianic"
          target="_blank"
          title="Github"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </footer>
  );
};

export default Footer;
