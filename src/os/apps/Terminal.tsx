import React, { useState, useRef, useEffect } from 'react';

export const Terminal: React.FC = () => {
  const [history, setHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([
    { type: 'output', text: 'OmniOS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for a list of commands.' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const args = trimmed.split(' ');
    const command = args[0].toLowerCase();

    let output = '';
    switch (command) {
      case 'help':
        output = 'Available commands: help, clear, echo, date, whoami, ls';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'echo':
        output = args.slice(1).join(' ');
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'whoami':
        output = 'guest';
        break;
      case 'ls':
        output = 'Documents  Downloads  Pictures  Music  Videos';
        break;
      default:
        output = `Command not found: ${command}`;
    }

    setHistory(prev => [
      ...prev, 
      { type: 'input', text: trimmed },
      { type: 'output', text: output }
    ]);
  };

  return (
    <div className="flex flex-col h-full w-full bg-black text-green-500 font-mono p-4 text-sm">
      <div className="flex-1 overflow-y-auto space-y-1">
        {history.map((item, i) => (
          <div key={i} className={item.type === 'input' ? 'text-white' : 'text-green-500'}>
            {item.type === 'input' ? <span className="text-blue-400 mr-2">guest@omnios:~$</span> : null}
            {item.text}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-blue-400 mr-2">guest@omnios:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand(input);
                setInput('');
              }
            }}
            className="flex-1 bg-transparent border-none outline-none text-white"
            autoFocus
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};
