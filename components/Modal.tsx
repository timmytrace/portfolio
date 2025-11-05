import React, { useEffect, useRef } from 'react';
import { XIcon } from './icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            triggerRef.current = document.activeElement as HTMLElement;
            
            const focusableElementsSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

            // Delay focus to allow for modal animation
            const timer = setTimeout(() => {
                const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(focusableElementsSelector);
                if (focusableElements && focusableElements.length > 0) {
                    focusableElements[0].focus();
                } else {
                    modalRef.current?.focus();
                }
            }, 100);

            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    onClose();
                }
                if (event.key === 'Tab') {
                    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(focusableElementsSelector);
                    if (!focusableElements || focusableElements.length === 0) return;

                    const firstElement = focusableElements[0];
                    const lastElement = focusableElements[focusableElements.length - 1];

                    if (event.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            event.preventDefault();
                        }
                    } else { // Tab
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            event.preventDefault();
                        }
                    }
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';

            return () => {
                clearTimeout(timer);
                document.removeEventListener('keydown', handleKeyDown);
                document.body.style.overflow = 'unset';
                triggerRef.current?.focus();
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ease-in-out animate-fade-in-up"
            style={{ animationDuration: '300ms' }}
            onClick={onClose}
        >
            <div
                ref={modalRef}
                tabIndex={-1}
                className="bg-dark-bg text-slate rounded-lg shadow-2xl w-11/12 max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative transform transition-all duration-300 ease-in-out focus:outline-none"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    {title && <h2 id="modal-title" className="text-2xl font-bold text-light-slate pr-8">{title}</h2>}
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="absolute top-4 right-4 text-slate hover:text-brand-primary transition-colors"
                    >
                        <XIcon className="w-7 h-7" />
                    </button>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};