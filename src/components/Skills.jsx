import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Skills.css';

const Skills = () => {
    const sectionRef = useRef(null);
    const marqueeRefs = useRef([]);

    useEffect(() => {
        marqueeRefs.current.forEach((el, index) => {
            if (!el) return;
            const isLeft = index % 2 === 0;
            const duration = 25 + (index * 5);

            // For tripled items, one loop is 33.333%
            gsap.set(el, { xPercent: isLeft ? 0 : -33.333 });

            gsap.to(el, {
                xPercent: isLeft ? -33.333 : 0,
                duration: duration,
                ease: "none",
                repeat: -1,
            });
        });

        return () => {
            gsap.killTweensOf(marqueeRefs.current);
        };
    }, []);

    const skillCategories = [
        {
            // title: 'Programming Language',
            skills: [
                { name: 'C', icon: 'devicon-c-plain' },
                { name: 'C++', icon: 'devicon-cplusplus-plain' },
                { name: 'JAVA', icon: 'devicon-java-plain' },
                { name: 'PYTHON', icon: 'devicon-python-plain' }
            ]
        },
        {
            // title: 'Frontend',
            skills: [
                { name: 'HTML', icon: 'devicon-html5-plain' },
                { name: 'CSS', icon: 'devicon-css3-plain' },
                { name: 'BOOTSTRAP', icon: 'devicon-bootstrap-plain' },
                { name: 'TAILWIND', icon: 'devicon-tailwindcss-original' },
                { name: 'JAVASCRIPT', icon: 'devicon-javascript-plain' },
                { name: 'REACT', icon: 'devicon-react-original' },
                { name: 'LOCOMOTIVE JS', icon: 'devicon-javascript-plain' },
                { name: 'SWIPER JS', icon: 'devicon-javascript-plain' },
                { name: 'SPLINE', icon: 'devicon-threejs-original' }
            ]
        },
        {
            // title: 'Backend',
            skills: [
                { name: 'NODE JS', icon: 'devicon-nodejs-plain' },
                { name: 'EXPRESS JS', icon: 'devicon-express-original' },
                { name: 'MYSQL', icon: 'devicon-mysql-plain' },
                { name: 'MONGODB', icon: 'devicon-mongodb-plain' }
            ]
        },
        {
            // title: 'Tools & Other',
            skills: [
                { name: 'GIT & GITHUB', icon: 'devicon-github-original' },
                { name: 'VSCODE', icon: 'devicon-vscode-plain' },
                { name: 'FIGMA', icon: 'devicon-figma-plain' },
                { name: 'DOCKER', icon: 'devicon-docker-plain' },
                { name: 'LINUX', icon: 'devicon-linux-plain' }
            ]
        }
    ];

    return (
        <section id="skills" className="section skills" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title" data-text="Skills">Skills & Expertise</h2>
                </div>

                <div className="skills-marquee-wrapper">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="category-row">
                            <h3 className="marquee-title">{category.title}</h3>
                            <div className="marquee-container">
                                <div
                                    className="marquee-inner"
                                    ref={el => marqueeRefs.current[index] = el}
                                >
                                    {[...category.skills, ...category.skills, ...category.skills].map((skill, i) => (
                                        <div key={i} className="skill-item-marquee">
                                            <i className={`${skill.icon} skill-icon-sm`}></i>
                                            <span className="skill-name-sm">{skill.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
