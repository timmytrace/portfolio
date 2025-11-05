import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { MenuIcon, XIcon } from './icons';

interface HeaderProps {
    onResumeClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onResumeClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = (
        <>
            {NAV_LINKS.map((link, index) => (
                <a key={link.name} href={link.href}
                   className="text-light-slate hover:text-brand-primary transition-colors duration-300"
                   style={{ animationDelay: `${index * 100}ms` }}
                   onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                </a>
            ))}
        </>
    );

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-bg/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
            <nav className="container mx-auto px-6 md:px-12 lg:px-24 py-4 flex justify-between items-center">
                <a href="#hero" className="text-2xl font-bold text-brand-primary z-50" aria-label="David Owolabi - Home">DO</a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks}
                    <button onClick={onResumeClick} className="text-brand-primary border border-brand-primary rounded-md px-4 py-2 hover:bg-brand-primary hover:bg-opacity-10 transition-colors duration-300">
                        Resume
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-50">
                    <button 
                        onClick={toggleMenu} 
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMenuOpen ? <XIcon className="w-7 h-7 text-brand-primary" /> : <MenuIcon className="w-7 h-7 text-brand-primary" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div id="mobile-menu" className={`fixed inset-0 bg-dark-bg transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
                    {navLinks}
                     <button 
                        onClick={() => {
                            onResumeClick();
                            setIsMenuOpen(false);
                        }}
                        className="mt-4 text-brand-primary border border-brand-primary rounded-md px-6 py-3 hover:bg-brand-primary hover:bg-opacity-10 transition-colors duration-300"
                    >
                        Resume
                    </button>
                </div>
            </div>
        </header>
    );
};