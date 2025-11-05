import React from 'react';
import { Project } from '../types';
import { GithubIcon } from './icons';

interface ProjectCardProps {
    project: Project;
    onCardClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onCardClick }) => {
    const imageUrl = project.image || `https://picsum.photos/seed/${project.title.replace(/\s/g, '')}/500/300`;

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onCardClick(project);
        }
    };

    return (
        <div 
            role="button"
            tabIndex={0}
            className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 items-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-md"
            onClick={() => onCardClick(project)}
            onKeyDown={handleKeyDown}
        >
            {/* Text content div - appears on right for md screens and up */}
            <div className="md:col-span-7 md:order-2 p-6 rounded-md bg-slate-900 bg-opacity-70 shadow-lg z-10 transition-colors duration-300 group-hover:bg-slate-800">
                <h3 className="text-2xl font-bold text-light-slate group-hover:text-brand-primary transition-colors duration-300">{project.title}</h3>
                <p className="mt-4 text-slate">{project.description}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-sm text-brand-secondary">
                    {project.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
                {project.link && (
                    <div className="mt-4">
                        <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-block text-slate hover:text-brand-primary transition-colors duration-300"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View ${project.title} on GitHub`}
                        >
                           <GithubIcon className="w-6 h-6" />
                        </a>
                    </div>
                )}
            </div>
            {/* Image div - appears on left for md screens and up */}
             <div className="md:col-span-5 md:order-1 h-full opacity-20 md:opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                <img src={imageUrl} alt={project.title} className="rounded-md w-full h-full object-cover" />
            </div>
        </div>
    );
};