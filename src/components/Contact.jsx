import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const infoRefs = useRef([]);
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        if (!sectionRef.current) return;

        // Animate section header
        gsap.fromTo(sectionRef.current.querySelector('.section-header'),
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current.querySelector('.section-header'),
                    start: 'top 85%',
                }
            }
        );

        // Animate info cards sliding from left
        infoRefs.current.forEach((el, index) => {
            if (!el) return;
            gsap.fromTo(el,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    delay: index * 0.15,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                    }
                }
            );
        });

        // Animate form sliding from right
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: 'top 90%',
                    }
                }
            );
        }

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="section contact" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title" data-text="Contact">Get In Touch</h2>
                    <span className="section-subtitle">Let's work together</span>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        {[
                            { label: 'Email', value: 'sandipchavan202004@gmail.com', icon: '✉' },
                            { label: 'Phone', value: '+91 8446068510', icon: '☏' },
                            { label: 'Location', value: 'Maharashtra, India', icon: '⌖' }
                        ].map((info, idx) => (
                            <div
                                key={idx}
                                className="info-card glass"
                                ref={el => infoRefs.current[idx] = el}
                            >
                                <div className="info-icon-wrapper">
                                    <span className="info-icon">{info.icon}</span>
                                </div>
                                <div className="info-text">
                                    <h3>{info.label}</h3>
                                    <p>{info.value}</p>
                                </div>
                            </div>
                        ))}

                        <div className="social-links-wrapper">
                            <h4 className="social-title">Follow Me</h4>
                            <div className="social-links">
                                <a href="https://github.com/SandipChavan2004" className="social-link glass" aria-label="GitHub">
                                    <i className="devicon-github-original"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/sandipchavan" className="social-link glass" aria-label="LinkedIn">
                                    <i className="devicon-linkedin-plain"></i>
                                </a>
                                <a href="#" className="social-link glass" aria-label="X">
                                    <i className="devicon-twitter-original"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form glass" ref={formRef} onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="your.email@example.com"
                                />
                            </div>
                        </div>
                        <div className="form-group w-100">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>
                        <button type="submit" className="contact-submit-btn">
                            Send Message <span className="btn-arrow">→</span>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
