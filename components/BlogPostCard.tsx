import React from 'react';
import { BlogPost } from '../types';

interface BlogPostCardProps {
    post: BlogPost;
    onClick: (post: BlogPost) => void;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onClick }) => {
    return (
        <div 
            className="bg-slate-900 bg-opacity-50 p-6 rounded-lg border border-brand-primary/20 shadow-lg transition-transform duration-300 hover:-translate-y-2 cursor-pointer group"
            onClick={() => onClick(post)}
        >
            <p className="text-sm text-brand-primary mb-2">{post.publicationDate}</p>
            <h3 className="text-xl font-bold text-light-slate mb-3 group-hover:text-brand-primary transition-colors duration-300">{post.title}</h3>
            <p className="text-slate mb-4">{post.summary}</p>
            <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <li key={tag} className="bg-brand-primary/10 text-brand-primary text-sm font-medium px-3 py-1 rounded-full">
                        {tag}
                    </li>
                ))}
            </ul>
        </div>
    );
};