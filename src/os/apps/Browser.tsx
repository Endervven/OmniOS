import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Search } from 'lucide-react';

export const Browser: React.FC = () => {
  const [url, setUrl] = useState('https://example.com');
  const [inputUrl, setInputUrl] = useState(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }
    setUrl(finalUrl);
    setInputUrl(finalUrl);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900">
      {/* Toolbar */}
      <div className="flex items-center space-x-2 p-2 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
        <button className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          <ArrowLeft size={16} />
        </button>
        <button className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          <ArrowRight size={16} />
        </button>
        <button className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          <RotateCw size={16} />
        </button>
        <button className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
          <Home size={16} />
        </button>
        
        <form onSubmit={handleSubmit} className="flex-1 flex items-center bg-zinc-200 dark:bg-zinc-800 rounded-full px-3 py-1">
          <Search size={14} className="text-zinc-500 mr-2" />
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 dark:text-zinc-200"
            placeholder="Search or enter website name"
          />
        </form>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white dark:bg-zinc-900 relative">
        <iframe 
          src={url} 
          className="absolute inset-0 w-full h-full border-none"
          title="Browser"
          sandbox="allow-same-origin allow-scripts"
        />
      </div>
    </div>
  );
};
