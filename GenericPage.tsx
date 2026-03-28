import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface GenericPageProps {
  title: string;
  content?: React.ReactNode;
  onBack: () => void;
}

export default function GenericPage({ title, content, onBack }: GenericPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            {title}
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none text-slate-400">
            {content || (
              <p>
                This is the {title} page. Content is currently under development.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
