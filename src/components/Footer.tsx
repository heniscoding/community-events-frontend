import "./Footer.css";

const Footer = () => {
  return (
    <footer className="home-footer">
      <p>Follow us on social media to keep up to date!</p>
      <ul className="social-links">
        <li>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </li>
      </ul>
      <p>&copy; 2024 Community Events. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

export {};
