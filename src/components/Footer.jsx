import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p className="copyright">
                        © {currentYear} Sandip Chavan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
