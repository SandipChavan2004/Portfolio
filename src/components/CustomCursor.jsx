import { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    useEffect(() => {
        const smoothFollow = () => {
            setDotPosition((prev) => ({
                x: prev.x + (mousePosition.x - prev.x) * 0.15,
                y: prev.y + (mousePosition.y - prev.y) * 0.15,
            }));
        };

        const animationFrame = requestAnimationFrame(smoothFollow);
        return () => cancelAnimationFrame(animationFrame);
    }, [mousePosition, dotPosition]);

    return (
        <div
            className="cursor-dot"
            style={{
                left: `${dotPosition.x}px`,
                top: `${dotPosition.y}px`,
            }}
        />
    );
};

export default CustomCursor;
