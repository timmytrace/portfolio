import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ClipboardIcon } from './icons';

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
    </div>
);

export const BlogHelper: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [generatedPost, setGeneratedPost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleGeneratePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic) return;

        setIsLoading(true);
        setError('');
        setGeneratedPost('');
        setCopySuccess('');
        setStatusMessage('Generating blog post...');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const prompt = `Write a blog post for a cybersecurity analyst's portfolio on the topic: "${topic}". The tone should be professional, insightful, and accessible to both technical and non-technical readers. The post should be well-structured with a clear title, an introduction, several body paragraphs with subheadings, and a conclusion. Format the output in simple Markdown (e.g., use '#' for title, '##' for subheadings, and '*' for bullet points).`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: prompt,
            });
            
            setGeneratedPost(response.text);
            setStatusMessage('Blog post generated successfully.');
        } catch (err) {
            console.error(err);
            setError('Failed to generate the blog post. Please check the topic or try again later.');
            setStatusMessage('Failed to generate the blog post.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopyToClipboard = () => {
        if (!generatedPost) return;
        navigator.clipboard.writeText(generatedPost).then(() => {
            setCopySuccess('Copied!');
            setStatusMessage('Content copied to clipboard.');
            setTimeout(() => setCopySuccess(''), 2000);
        }, (err) => {
            setCopySuccess('Failed to copy.');
            setStatusMessage('Failed to copy content to clipboard.');
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <div className="mt-4">
            <p className="text-slate mb-4">
                Enter a topic or a title, and the AI will draft a blog post for you. This can be a great starting point for your next article.
            </p>
            <form onSubmit={handleGeneratePost} className="space-y-4">
                <label htmlFor="blog-topic" className="sr-only">Blog Post Topic</label>
                <input
                    id="blog-topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'The role of AI in modern phishing detection'"
                    className="w-full bg-slate-900 border border-slate/50 rounded-md p-3 text-light-slate placeholder-slate focus:outline-none focus:ring-2 focus:ring-brand-primary transition-shadow"
                    disabled={isLoading}
                />
                <button 
                    type="submit" 
                    disabled={isLoading || !topic}
                    className="w-full bg-brand-primary text-dark-bg font-bold py-3 px-6 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Generating...' : 'Generate Post'}
                </button>
            </form>

            <div role="status" className="sr-only">
                {statusMessage}
            </div>

            {isLoading && <div className="mt-6"><Spinner /></div>}
            
            {error && <p className="mt-4 text-red-400 text-center">{error}</p>}
            
            {generatedPost && (
                <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                         <h4 className="text-lg font-bold text-light-slate">Generated Draft</h4>
                         <button 
                            onClick={handleCopyToClipboard}
                            className="flex items-center gap-2 text-sm text-slate hover:text-brand-primary transition-colors"
                            aria-label="Copy generated text to clipboard"
                         >
                            <ClipboardIcon className="w-5 h-5" />
                            <span>{copySuccess || 'Copy Text'}</span>
                         </button>
                    </div>
                    <div className="p-4 bg-slate-900/70 rounded-md border border-slate/30 max-h-80 overflow-y-auto">
                        <p className="text-light-slate whitespace-pre-wrap font-mono text-sm">{generatedPost}</p>
                    </div>
                </div>
            )}
        </div>
    );
};