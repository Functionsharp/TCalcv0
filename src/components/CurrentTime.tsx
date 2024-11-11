import React from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

interface CurrentTimeProps {
  currentTime: Date;
}

export const CurrentTime: React.FC<CurrentTimeProps> = ({ currentTime }) => {
  return (
    <div className="bg-indigo-50 rounded-lg p-4 mb-6">
      <h2 className="text-sm font-semibold text-indigo-600 mb-1">Current Time (Sydney)</h2>
      <p className="text-2xl font-bold text-gray-800">
        {format(currentTime, 'EEEE, MMMM d, yyyy HH:mm:ss')}
      </p>
    </div>
  );
};