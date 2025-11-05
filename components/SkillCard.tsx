
import React from 'react';
import { Skill } from '../types';

interface SkillCardProps {
    title: string;
    skills: Skill[];
}

export const SkillCard: React.FC<SkillCardProps> = ({ title, skills }) => {
    return (
        <div className="bg-slate-900 bg-opacity-50 p-6 rounded-lg border border-brand-primary/20 shadow-lg">
            <h3 className="text-xl font-bold text-light-slate mb-4">{title}</h3>
            <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <li key={skill.name} className="bg-brand-primary/10 text-brand-primary text-sm font-medium px-3 py-1 rounded-full">
                        {skill.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
