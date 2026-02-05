import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);
    const panelsRef = useRef([]);

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

        const element = document.getElementById('projects');
        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const panels = panelsRef.current.filter(panel => panel !== null);

        // Reset any existing animations
        ScrollTrigger.getAll().filter(st => st.vars.id && st.vars.id.includes('project-')).forEach(st => st.kill());

        panels.forEach((panel, index) => {
            const isLast = index === panels.length - 1;

            // Pin each card
            ScrollTrigger.create({
                trigger: panel,
                start: 'top top',
                end: () => `+=${(panels.length - index) * 100}%`,
                pin: true,
                pinSpacing: isLast, // ONLY the last card gets spacing to push following sections
                id: `project-pin-${index}`,
                scrub: 1,
                anticipatePin: 1,
            });

            // If not the last card, animate it (scale down, fade) as the next one comes up
            if (!isLast) {
                const currentCard = panel.querySelector('.project-card');
                const nextPanel = panels[index + 1];

                gsap.to(currentCard, {
                    scale: 0.92,
                    opacity: 0.3,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: nextPanel,
                        start: 'top 100%',
                        end: 'top 0%',
                        scrub: 1, // Smooth scrubbing with 1 second delay
                        id: `project-effect-${index}`,
                    }
                });
            }
        });

        // Refresh to ensure all positions are correct
        ScrollTrigger.refresh();

        return () => {
            ScrollTrigger.getAll().filter(st => st.vars.id && st.vars.id.includes('project-')).forEach(st => st.kill());
        };
    }, []);

    const projects = [
        {
            title: 'Smart Village Mart',
            description: 'Developed a full-stack e-commerce platform connecting rural shopkeepers with customers to digitize local businesses.',
            tech: ['React', 'Tailwind CSS', 'Javascript', 'Node JS', 'Express JS', 'MySQL', 'vite'],
            link: 'https://github.com/SandipChavan2004/smart_village_mart.git',
            image: '/assets/svm.jpeg',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            title: 'AI Voice Assistant',
            description: 'ADeveloped AI-powered virtual voice assistant inspired by Alexa and Google Assistant. The system can understand natural language commands, perform intelligent web searches, and interact through speech in real time.',
            tech: ['Python', 'Pyttsx3', 'Speech Recognition', 'Web APIs (OpenAI, ElevenLabs)'],
            link: 'https://github.com/SandipChavan2004/Rudra-AI-Voice-Assistant-Python-.git',
            image: 'https://img.freepik.com/premium-photo/3d-ai-assistant-icon-artificial-intelligence-virtual-helper-logo-illustration_762678-40617.jpg',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {

            title: 'TLUG- Club Website',
            description: ' Developed a comprehensive community website for the TKIET Linux User Group. The platform serves as the digital hub for members, events, announcements, member profiles, and photo galleries.',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Node Js', 'Express Js'],
            link: 'https://github.com/SandipChavan2004/TLUG.git',
            image: '/assets/tlug.jpeg',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        },

        {
            title: 'Portfolio Website',
            description: 'A modern, responsive portfolio website with stunning animations, glassmorphism effects, and space-themed design.',
            tech: ['React', 'CSS3', 'Vite', 'JavaScript'],
            link: '#',
            image: '/assets/portfolio.jpeg',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ];

    return (
        <section id="projects" className={`projects ${isVisible ? 'visible' : ''}`}>
            <div className="projects-background">
                <div className="projects-overlay"></div>
                <div className="stars"></div>
            </div>
            <div className="section-header">
                <h2 className="section-title" data-text="Projects">Featured Projects</h2>
                <span className="section-subtitle">Some of my recent work</span>
            </div>

            <div className="projects-container" ref={containerRef}>
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card-wrapper"
                        ref={el => panelsRef.current[index] = el}
                    >
                        <div className="project-card glass" data-number={`0${index + 1}`}>
                            <div className="project-card-inner">
                                <div className="project-header">
                                    <img src={project.image} alt={project.title} className="project-image" />
                                    <div className="project-gradient" style={{ background: project.gradient }}></div>
                                </div>
                                <div className="project-content">
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-description">{project.description}</p>
                                    <ul className="project-tech">
                                        {project.tech.map((tech, i) => (
                                            <li key={i} className="tech-item">{tech}</li>
                                        ))}
                                    </ul>
                                    <a href={project.link} className="project-link">
                                        View Project →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
