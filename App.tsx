import React, { useState } from 'react';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { SkillCard } from './components/SkillCard';
import { ProjectCard } from './components/ProjectCard';
import { Modal } from './components/Modal';
import { GithubIcon, LinkedinIcon, MailIcon, SparklesIcon } from './components/icons';
import { SKILL_CATEGORIES, PROJECTS, CERTIFICATIONS, BLOG_POSTS } from './constants';
import { Project, BlogPost } from './types';
import { BlogPostCard } from './components/BlogPostCard';
import { PROFILE_PICTURE } from './assets/images';
import { AIQueryBox } from './components/AIQueryBox';
import { BlogHelper } from './components/BlogHelper';
import { Resume } from './components/Resume';


const App: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isBlogHelperOpen, setIsBlogHelperOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);


    const handleOpenProjectModal = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseProjectModal = () => {
        setSelectedProject(null);
    };

    const handleOpenBlogModal = (post: BlogPost) => {
        setSelectedPost(post);
    };

    const handleCloseBlogModal = () => {
        setSelectedPost(null);
    };
    
    const handleOpenBlogHelper = () => setIsBlogHelperOpen(true);
    const handleCloseBlogHelper = () => setIsBlogHelperOpen(false);

    const handleOpenResume = () => setIsResumeOpen(true);
    const handleCloseResume = () => setIsResumeOpen(false);


    return (
        <div className="bg-dark-bg text-slate min-h-screen font-sans">
            <Header onResumeClick={handleOpenResume} />

            <main className="container mx-auto px-6 md:px-12 lg:px-24">
                {/* Hero Section */}
                <section id="hero" className="min-h-screen flex flex-col justify-center animate-fade-in-up">
                    <h1 className="text-brand-primary text-lg font-medium">Hi, my name is</h1>
                    <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-light-slate mt-2">David Owolabi.</h2>
                    <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate mt-2">I analyze and defend digital assets.</h3>
                    <p className="mt-6 max-w-xl text-lg">
                        I'm a junior cybersecurity analyst with a passion for defensive security, threat hunting, and incident response. 
                        I thrive on identifying vulnerabilities and building resilient systems to protect against cyber threats.
                    </p>
                    <a href="#projects" className="mt-8 text-brand-primary border border-brand-primary rounded-md px-8 py-3 w-max hover:bg-brand-primary hover:bg-opacity-10 transition-colors duration-300">
                        Check out my work
                    </a>
                </section>

                {/* About Section */}
                <Section id="about" title="About Me">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                        <div className="md:col-span-3 text-lg space-y-4">
                            <p>
                                My journey into cybersecurity began with a curiosity about how systems work and, more importantly, how they break. This led me down the rabbit hole of network protocols, operating system internals, and the ever-evolving landscape of cyber threats. I am deeply committed to being a part of the solution in making the digital world a safer place.
                            </p>
                            <p>
                                I am a recent graduate with hands-on experience in security monitoring, vulnerability assessment, and risk analysis gained through personal projects and capture-the-flag competitions. I am eager to apply my skills in a real-world environment and contribute to a security team that values continuous learning and proactive defense.
                            </p>
                            <p>Here are a few technologies I've been working with recently:</p>
                             <ul className="list-disc list-inside grid grid-cols-2 gap-2 text-brand-primary">
                                <li>Splunk</li>
                                <li>Python</li>
                                <li>Wireshark</li>
                                <li>Nessus</li>
                                <li>Linux</li>
                                <li>Active Directory</li>
                            </ul>
                        </div>
                        <div className="md:col-span-2 flex items-center justify-center">
                            <div className="w-64 h-64 lg:w-72 lg:h-72 relative group">
                                <div className="absolute inset-0 bg-brand-primary rounded-md transform rotate-3 group-hover:rotate-0 transition-transform duration-300"></div>
                                <img src={PROFILE_PICTURE} alt="David Owolabi" className="absolute inset-0 w-full h-full object-cover rounded-md z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Skills Section */}
                <Section id="skills" title="My Skillset">
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                       {SKILL_CATEGORIES.map((category) => (
                           <SkillCard key={category.title} title={category.title} skills={category.skills} />
                       ))}
                   </div>
                </Section>
                
                {/* Projects Section */}
                <Section id="projects" title="Featured Projects">
                    <div className="space-y-12">
                        {PROJECTS.map((project, index) => (
                            <ProjectCard key={index} project={project} onCardClick={handleOpenProjectModal} />
                        ))}
                    </div>
                </section>

                {/* Certifications Section */}
                <Section id="certifications" title="Certifications">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CERTIFICATIONS.map(cert => (
                            <div key={cert.name} className="bg-slate-900 bg-opacity-50 p-6 rounded-lg border border-brand-primary/20 shadow-lg transition-transform duration-300 hover:-translate-y-2">
                                <h3 className="font-bold text-light-slate text-xl">{cert.name}</h3>
                                <p className="text-brand-primary mt-1">{cert.issuer}</p>
                                <p className="text-slate text-sm mt-2">{cert.date}</p>
                                {cert.credentialId && <p className="text-slate text-xs mt-1">ID: {cert.credentialId}</p>}
                            </div>
                        ))}
                    </div>
                </section>
                
                {/* Blog Section */}
                <Section 
                    id="blog" 
                    title="From the Blog"
                    headerAction={
                        <button
                            onClick={handleOpenBlogHelper}
                            className="flex items-center gap-2 text-brand-primary border border-brand-primary rounded-md px-4 py-2 text-sm font-medium hover:bg-brand-primary hover:bg-opacity-10 transition-colors duration-300"
                            aria-label="Open AI Blog Helper"
                        >
                            <SparklesIcon className="w-5 h-5" />
                            <span>AI Blog Helper</span>
                        </button>
                    }
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post) => (
                            <BlogPostCard key={post.slug} post={post} onClick={handleOpenBlogModal} />
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <Section id="contact" title="Get In Touch">
                    <div className="text-center max-w-2xl mx-auto">
                         <h2 className="text-3xl md:text-4xl font-bold text-light-slate mb-4">Let's Connect</h2>
                         <p className="text-lg mb-8">
                            I'm currently seeking new opportunities and am open to connecting. Whether you have a question or just want to say hi, feel free to reach out. I'll do my best to get back to you!
                         </p>
                         <a href="mailto:david.owolabi.cyber@email.com" className="text-brand-primary text-xl font-mono hover:underline">
                            david.owolabi.cyber@email.com
                         </a>
                         <div className="flex justify-center items-center space-x-6 mt-12">
                             <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-brand-primary transition-colors duration-300" aria-label="View my GitHub profile">
                                 <GithubIcon className="w-8 h-8" />
                             </a>
                             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-brand-primary transition-colors duration-300" aria-label="View my LinkedIn profile">
                                 <LinkedinIcon className="w-8 h-8" />
                             </a>
                             <a href="mailto:david.owolabi.cyber@email.com" className="text-slate hover:text-brand-primary transition-colors duration-300" aria-label="Send me an email">
                                 <MailIcon className="w-8 h-8" />
                             </a>
                         </div>
                    </div>
                </section>
            </main>
            
            {selectedProject && (
                <Modal isOpen={!!selectedProject} onClose={handleCloseProjectModal} title={selectedProject.title}>
                    <div className="mt-4">
                        <img
                            src={selectedProject.image || `https://picsum.photos/seed/${selectedProject.title.replace(/\s/g, '')}/800/450`}
                            alt={selectedProject.title}
                            className="w-full h-auto rounded-md mb-6 object-cover"
                        />
                        <p className="text-slate text-lg mb-6">{selectedProject.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedProject.tags.map(tag => (
                                <span key={tag} className="bg-brand-primary/10 text-brand-primary text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                        {selectedProject.link && (
                            <a
                                href={selectedProject.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-slate hover:text-brand-primary transition-colors duration-300"
                            >
                                <GithubIcon className="w-6 h-6" />
                                <span>View on GitHub</span>
                            </a>
                        )}
                    </div>
                </Modal>
            )}

            {selectedPost && (
                <Modal isOpen={!!selectedPost} onClose={handleCloseBlogModal} title={selectedPost.title}>
                    <div className="mt-4">
                        <p className="text-sm text-brand-primary mb-4">{selectedPost.publicationDate}</p>
                        <div className="space-y-4 text-slate text-base mb-6 leading-relaxed">
                            {selectedPost.content.split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                         <div className="flex flex-wrap gap-2 mb-6">
                            {selectedPost.tags.map(tag => (
                                <span key={tag} className="bg-brand-primary/10 text-brand-primary text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                        
                        <AIQueryBox postContent={selectedPost.content} />
                    </div>
                </Modal>
            )}

            <Modal isOpen={isBlogHelperOpen} onClose={handleCloseBlogHelper} title="AI Blog Post Generator">
                <BlogHelper />
            </Modal>
            
            <Modal isOpen={isResumeOpen} onClose={handleCloseResume} title="David Owolabi's Resume">
                <Resume />
            </Modal>


            <footer className="text-center py-6 text-sm text-slate">
                <p>&copy; {new Date().getFullYear()} David Owolabi. Built with React & Tailwind CSS.</p>
            </footer>
        </div>
    );
};

export default App;