import React, { useState } from 'react';
import { Plus, Trash2, Edit3 } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
}

export const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Welcome to OmniOS', content: 'This is a concept OS combining Windows, macOS, and Android features.\n\nTry dragging windows, opening the app drawer, and using the quick settings!', date: new Date() }
  ]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>('1');

  const activeNote = notes.find(n => n.id === activeNoteId);

  const createNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      date: new Date()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (field: 'title' | 'content', value: string) => {
    if (!activeNoteId) return;
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, [field]: value, date: new Date() } : n));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) {
      setActiveNoteId(notes.length > 1 ? notes.find(n => n.id !== id)?.id || null : null);
    }
  };

  return (
    <div className="flex h-full w-full bg-white dark:bg-zinc-900">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 flex flex-col">
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="font-semibold text-zinc-800 dark:text-zinc-200">Notes</h2>
          <button onClick={createNote} className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {notes.map(note => (
            <div 
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${activeNoteId === note.id ? 'bg-blue-500 text-white' : 'hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200'}`}
            >
              <div className="font-medium truncate">{note.title || 'Untitled'}</div>
              <div className={`text-xs truncate mt-1 ${activeNoteId === note.id ? 'text-blue-100' : 'text-zinc-500'}`}>
                {note.content || 'No additional text'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-white dark:bg-zinc-900">
        {activeNote ? (
          <>
            <div className="p-4 flex justify-end border-b border-zinc-100 dark:border-zinc-800/50">
              <button onClick={() => deleteNote(activeNote.id)} className="p-1.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="flex-1 p-8 flex flex-col">
              <input 
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote('title', e.target.value)}
                className="text-3xl font-bold bg-transparent border-none outline-none text-zinc-900 dark:text-zinc-100 mb-6 placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                placeholder="Note Title"
              />
              <textarea 
                value={activeNote.content}
                onChange={(e) => updateNote('content', e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-zinc-700 dark:text-zinc-300 resize-none leading-relaxed placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
                placeholder="Start typing..."
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-400">
            <Edit3 size={48} className="mb-4 opacity-20" />
            <p>Select a note or create a new one</p>
          </div>
        )}
      </div>
    </div>
  );
};
