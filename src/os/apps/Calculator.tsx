import React, { useState } from 'react';
import { cn } from '../../utils';

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    if (display === '0') setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  return (
    <div className="flex flex-col h-full w-full bg-zinc-900 text-white p-4">
      {/* Display */}
      <div className="flex-1 flex flex-col justify-end items-end p-4 mb-4">
        <div className="text-zinc-400 text-sm h-6">{equation}</div>
        <div className="text-5xl font-light tracking-tight truncate w-full text-right">{display}</div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-2 h-2/3">
        {buttons.flat().map((btn, i) => {
          const isOperator = ['/', '*', '-', '+', '='].includes(btn);
          const isAction = ['C', '±', '%'].includes(btn);
          const isZero = btn === '0';

          return (
            <button
              key={i}
              onClick={() => {
                if (btn === 'C') clear();
                else if (btn === '=') calculate();
                else if (isOperator) handleOperator(btn);
                else if (!isAction) handleNumber(btn);
              }}
              className={cn(
                "rounded-full flex items-center justify-center text-xl font-medium transition-colors active:scale-95",
                isZero ? "col-span-2 aspect-auto justify-start pl-8" : "aspect-square",
                isOperator ? "bg-orange-500 hover:bg-orange-400 text-white" :
                isAction ? "bg-zinc-300 hover:bg-zinc-200 text-black" :
                "bg-zinc-800 hover:bg-zinc-700 text-white"
              )}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
