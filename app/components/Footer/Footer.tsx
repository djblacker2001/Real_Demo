import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="footer">
      &copy; {currentYear} MyAdmin. All rights reserved.
    </footer>
  );
};

export default Footer;
