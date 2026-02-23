import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Share2, Heart, Info } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/gallery${i}/800/600`,
    title: `Photo ${i + 1}`,
    date: 'Oct 15, 2023'
  }));

  return (
    <div className="flex flex-col h-full w-full bg-white dark:bg-zinc-900">
      {/* Toolbar */}
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-zinc-50 dark:bg-zinc-950/50">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Gallery</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors">
            Import
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <button 
              key={i}
              onClick={() => setSelectedImage(i)}
              className="group aspect-square rounded-xl overflow-hidden relative bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <span className="text-white text-sm font-medium truncate">{img.title}</span>
                <span className="text-white/70 text-xs">{img.date}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="absolute inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col">
          {/* Top Bar */}
          <div className="h-14 flex items-center justify-between px-4 text-white">
            <button 
              onClick={() => setSelectedImage(null)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="font-medium">{images[selectedImage].title}</div>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Heart size={20} /></button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Share2 size={20} /></button>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors"><Info size={20} /></button>
            </div>
          </div>

          {/* Image Area */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            <button 
              onClick={() => setSelectedImage(prev => prev !== null && prev > 0 ? prev - 1 : images.length - 1)}
              className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <img 
              src={images[selectedImage].url} 
              alt={images[selectedImage].title}
              className="max-w-full max-h-full object-contain drop-shadow-2xl"
            />

            <button 
              onClick={() => setSelectedImage(prev => prev !== null && prev < images.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
