import React, { useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface SectionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    headerAction?: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, headerAction }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.05, triggerOnce: true });

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`py-20 md:py-28 transition-all duration-700 ease-out transform ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
            <div className="flex justify-between items-center mb-12">
                <div className="flex items-center flex-grow">
                    <h2 className="text-3xl font-bold text-light-slate whitespace-nowrap">
                        {title}
                    </h2>
                    <div className="w-full h-px bg-slate/30 ml-6"></div>
                </div>
                {headerAction && <div className="ml-4 flex-shrink-0">{headerAction}</div>}
            </div>
            {children}
        </section>
    );
};