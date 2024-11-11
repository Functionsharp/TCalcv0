import React from 'react';
import { formatDistance } from 'date-fns';

interface ResultDisplayProps {
  startDate: Date;
  targetDate: Date;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ startDate, targetDate }) => {
  const difference = formatDistance(targetDate, startDate, { addSuffix: true });
  const isInPast = targetDate < startDate;

  return (
    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
      <h3 className="text-sm font-semibold text-indigo-600 mb-1">Time Difference</h3>
      <p className="text-xl font-bold text-gray-800">
        {isInPast ? 'Was ' : 'Will be '}{difference}
      </p>
    </div>
  );
};