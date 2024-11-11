import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { parseNaturalLanguage } from '../utils/dateUtils';

interface NaturalLanguageInputProps {
  onDateParsed: (date: Date | null) => void;
}

export const NaturalLanguageInput: React.FC<NaturalLanguageInputProps> = ({ onDateParsed }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedDate = parseNaturalLanguage(input);
      if (parsedDate) {
        onDateParsed(parsedDate);
        setError('');
      } else {
        setError('Could not understand the date/time. Please try again.');
      }
    } catch (err) {
      setError('Could not understand the date/time. Please try again.');
    }
  };

  const examples = [
    'Christmas at noon',
    'next Friday at 3pm',
    'July 4th at 2pm',
    'tomorrow at 9am',
    'in 2 hours',
  ];

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a date/time like 'Christmas at noon'"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Parse Date/Time
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <div className="text-sm text-gray-500">
        <p className="font-medium mb-1">Try phrases like:</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => setInput(example)}
              className="px-2 py-1 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};