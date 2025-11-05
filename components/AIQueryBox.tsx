import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const Spinner: React.FC = () => (
    <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
    </div>
);

interface AIQueryBoxProps {
    postContent: string;
}

export const AIQueryBox: React.FC<AIQueryBoxProps> = ({ postContent }) => {
    const [prompt, setPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleGenerateContent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt) return;

        setIsLoading(true);
        setError('');
        setAiResponse('');
        setStatusMessage('Thinking...');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const fullPrompt = `Based on the following blog post, answer the user's question. If the question is unrelated to the post, politely state that you can only answer questions about the article.\n\n--- Blog Post ---\n${postContent}\n\n--- User's Question ---\n${prompt}\n\n--- Answer ---`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: fullPrompt,
            });

            setAiResponse(response.text);
            setStatusMessage('AI response generated successfully.');

        } catch (err) {
            console.error(err);
            setError('Failed to generate response. Please try again.');
            setStatusMessage('An error occurred while generating the response.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mt-8 border-t border-slate/30 pt-6">
            <h4 className="text-xl font-bold text-light-slate mb-4">Ask AI about this post</h4>
            <form onSubmit={handleGenerateContent}>
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., 'What is the main takeaway?'"
                        className="flex-grow bg-slate-900 border border-slate/50 rounded-md p-3 text-light-slate placeholder-slate focus:outline-none focus:ring-2 focus:ring-brand-primary transition-shadow"
                        disabled={isLoading}
                        aria-label="Ask a question about the blog post"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading || !prompt}
                        className="bg-brand-primary text-dark-bg font-bold py-3 px-6 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Thinking...' : 'Ask AI'}
                    </button>
                </div>
            </form>
            
            <div role="status" className="sr-only">
                {statusMessage}
            </div>

            {isLoading && <div className="mt-6"><Spinner /></div>}
            
            {error && <p className="mt-4 text-red-400">{error}</p>}
            
            {aiResponse && (
                <div className="mt-6 p-4 bg-slate-900/70 rounded-md border border-slate/30">
                    <p className="text-light-slate whitespace-pre-wrap">{aiResponse}</p>
                </div>
            )}
        </div>
    );
};