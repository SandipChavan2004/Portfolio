import { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/assets/hero.mp4" type="video/mp4" />
                </video>
                <div className="video-overlay"></div>
                <div className="stars"></div>
            </div>

            <div className="hero-container">
                <div className={`hero-content ${isVisible ? 'visible' : ''}`}>
                    <p className="hero-subtitle">Computer Science Student</p>
                    <h1 className="hero-title">
                        <span className="name-first">Sandip</span>{' '}
                        <span className="name-last">Chavan</span>
                    </h1>
                    <p className="hero-description">
                        Motivated and enthusiastic Computer Science and Engineering
                        student eager to apply technical skills and knowledge in a dynamic
                        environment. Passionate about continuous learning, problem-solving,
                        and contributing effectively to the success of an organization.
                    </p>
                    <div className="hero-buttons">
                        <button
                            className="btn btn-primary"
                            onClick={() => scrollToSection('projects')}
                        >
                            See All Projects
                        </button>
                        <a
                            href="https://drive.google.com/file/d/1g-aNSe9aYgKsECtIWjcQAeLYnvkRDthq/view?usp=sharing"
                            className="btn btn-secondary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Download Resume
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
