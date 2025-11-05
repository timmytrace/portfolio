import React from 'react';
import { SKILL_CATEGORIES, PROJECTS, CERTIFICATIONS } from '../constants';
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from './icons';

const TOOLS_PLATFORMS = [
    {
        name: 'Splunk',
        description: 'Utilized for log ingestion and analysis in a home lab environment, creating dashboards to monitor security events.'
    },
    {
        name: 'Wireshark & Suricata',
        description: 'Deployed in a Security Onion setup to perform deep packet inspection and analyze network traffic for malicious signatures and anomalies.'
    },
    {
        name: 'Nessus',
        description: 'Conducted comprehensive vulnerability scans on test networks to identify and prioritize system weaknesses for remediation.'
    },
    {
        name: 'Metasploit',
        description: 'Used to validate and exploit identified vulnerabilities in a controlled penetration testing exercise, demonstrating impact and gaining initial access.'
    },
    {
        name: 'Nmap',
        description: 'Performed network discovery and security auditing to identify active hosts, open ports, and running services.'
    },
    {
        name: 'Burp Suite',
        description: 'Conducted web application security testing to identify and exploit common vulnerabilities like SQL injection and XSS.'
    }
];

const ResumeSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
        <h2 className="text-xl font-bold text-brand-primary mb-3 pb-2 border-b-2 border-brand-primary/30">{title}</h2>
        {children}
    </section>
);

export const Resume: React.FC = () => {
    return (
        <div className="text-slate bg-dark-bg font-sans text-sm p-1 leading-relaxed">
            {/* Header */}
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-light-slate">David Owolabi</h1>
                <p className="text-lg text-brand-primary">Junior Cybersecurity Analyst</p>
                <div className="flex justify-center items-center gap-x-4 gap-y-1 mt-2 flex-wrap text-xs">
                    <a href="mailto:david.owolabi.cyber@email.com" className="flex items-center gap-1.5 hover:text-brand-primary" aria-label="Email David Owolabi at david.owolabi.cyber@email.com"><MailIcon className="w-4 h-4" /> david.owolabi.cyber@email.com</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-brand-primary" aria-label="View David Owolabi's LinkedIn profile"><LinkedinIcon className="w-4 h-4" /> linkedin.com/in/davidowolabi</a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-brand-primary" aria-label="View David Owolabi's GitHub profile"><GithubIcon className="w-4 h-4" /> github.com/your-username</a>
                </div>
            </header>

            <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-16 flex items-center gap-2 text-sm text-slate hover:text-brand-primary transition-colors"
                aria-label="Download resume as PDF"
            >
                <DownloadIcon className="w-5 h-5" />
                <span>Download PDF</span>
            </a>

            {/* Summary */}
            <ResumeSection title="Summary">
                <p>
                    Proactive and detail-oriented Junior Cybersecurity Analyst with hands-on experience in security monitoring, threat detection, and vulnerability assessment. Passionate about defensive security and incident response, with a strong foundation in network protocols, operating systems, and modern security tools. Eager to contribute to a dynamic security team and apply skills to protect critical digital assets.
                </p>
            </ResumeSection>

            {/* Skills */}
            <ResumeSection title="Core Competencies">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                    {SKILL_CATEGORIES.map(category => (
                        <div key={category.title} className="mb-2">
                            <h3 className="font-semibold text-light-slate">{category.title}</h3>
                            <ul className="flex flex-wrap gap-x-2 gap-y-1 text-xs">
                                {category.skills.map(skill => <li key={skill.name} className="bg-slate-700/50 px-2 py-0.5 rounded">{skill.name}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </ResumeSection>
            
            {/* Tools & Platforms */}
            <ResumeSection title="Cybersecurity Tools & Platforms">
                 <ul className="space-y-2">
                    {TOOLS_PLATFORMS.map(tool => (
                        <li key={tool.name}>
                            <span className="font-semibold text-light-slate">{tool.name}:</span> {tool.description}
                        </li>
                    ))}
                </ul>
            </ResumeSection>

            {/* Projects */}
            <ResumeSection title="Hands-On Projects">
                <div className="space-y-4">
                    {PROJECTS.map(project => (
                        <div key={project.title}>
                            <h3 className="font-bold text-light-slate">{project.title}</h3>
                            <p className="my-1">{project.description}</p>
                            <p className="text-xs">
                                <span className="font-semibold">Technologies:</span> {project.tags.join(', ')}
                            </p>
                        </div>
                    ))}
                </div>
            </ResumeSection>

            {/* Certifications */}
            <ResumeSection title="Certifications">
                 <ul className="list-disc list-inside">
                    {CERTIFICATIONS.map(cert => (
                        <li key={cert.name}>
                            <span className="font-semibold text-light-slate">{cert.name}</span> - {cert.issuer} ({cert.date})
                        </li>
                    ))}
                </ul>
            </ResumeSection>

            {/* Education */}
            <ResumeSection title="Education">
                <div>
                    <h3 className="font-bold text-light-slate">Bachelor of Science in Cybersecurity (or relevant field)</h3>
                    <p>University Name, City, State | Graduated Month Year</p>
                </div>
            </ResumeSection>
        </div>
    );
};