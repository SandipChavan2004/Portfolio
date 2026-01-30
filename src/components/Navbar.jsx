import { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isMobileMenuOpen]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <div
                className={`navbar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <div className="navbar-logo" onClick={() => scrollToSection('home')}>
                        <a href="#home" className="logo-text">SC</a>
                    </div>

                    <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                        <a href="#home" onClick={() => scrollToSection('home')} className="nav-link">Home</a>
                        <a href="#about" onClick={() => scrollToSection('about')} className="nav-link">About</a>
                        <a href="#projects" onClick={() => scrollToSection('projects')} className="nav-link">Projects</a>
                        <a href="#skills" onClick={() => scrollToSection('skills')} className="nav-link">Skills</a>
                        <a href="#contact" onClick={() => scrollToSection('contact')} className="nav-link contact-btn">ContactMe</a>
                    </div>

                    <div
                        className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation"
                        role="button"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
