import { useState, useEffect } from 'react';
import './About.css';

const About = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('about');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    return (
        <section id="about" className={`section about ${isVisible ? 'visible' : ''}`}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title" data-text="About Me">About Me</h2>
                </div>

                <div className="about-content">
                    <div className="about-photo-wrapper">
                        <div className="photo-container">
                            <img
                                src="/assets/img.jpeg"
                                alt="Sandip Chavan"
                                className="profile-photo"
                            />
                        </div>
                    </div>

                    <div className="about-text">
                        <h3 className="about-heading">Who I Am</h3>
                        <p>
                            I'm a passionate Computer Science and Engineering student with a deep love for
                            creating elegant solutions to complex problems. My journey in tech started with
                            curiosity and has evolved into a commitment to continuous learning and innovation.
                        </p>
                        <p>
                            With expertise in full-stack development, I specialize in building modern,
                            responsive web applications that deliver exceptional user experiences. I believe
                            in writing clean, maintainable code and staying up-to-date with the latest
                            industry trends and best practices.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
