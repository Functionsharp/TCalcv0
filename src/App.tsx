import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { CurrentTime } from './components/CurrentTime';
import { DateTimePicker } from './components/DateTimePicker';
import { ResultDisplay } from './components/ResultDisplay';
import { NaturalLanguageInput } from './components/NaturalLanguageInput';
import { 
  SYDNEY_TIMEZONE, 
  formatToDateTimeLocal, 
  convertToSydneyTime, 
  convertFromSydneyTime 
} from './utils/dateUtils';

function App() {
  const [currentTime, setCurrentTime] = useState(convertToSydneyTime(new Date()));
  const [startDate, setStartDate] = useState<Date>(convertToSydneyTime(new Date()));
  const [targetDate, setTargetDate] = useState<Date>(convertToSydneyTime(new Date()));
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'natural'>('natural');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(convertToSydneyTime(new Date()));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setStartDate(convertToSydneyTime(date));
    setShowResult(false);
  };

  const handleTargetDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setTargetDate(convertToSydneyTime(date));
    setShowResult(false);
  };

  const handleNaturalLanguageParsed = (date: Date | null) => {
    if (date) {
      setTargetDate(date);
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Clock className="w-8 h-8 text-indigo-600" />
          Time Calculator
        </h1>
        
        <CurrentTime currentTime={currentTime} />

        <div className="mb-6">
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab('natural')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'natural'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Natural Language
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                activeTab === 'manual'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Manual Input
            </button>
          </div>

          {activeTab === 'natural' ? (
            <NaturalLanguageInput onDateParsed={handleNaturalLanguageParsed} />
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <DateTimePicker 
                  label="Select Start Date & Time"
                  onChange={handleStartDateChange}
                  value={formatToDateTimeLocal(startDate)}
                />

                <DateTimePicker 
                  label="Select Target Date & Time"
                  onChange={handleTargetDateChange}
                  value={formatToDateTimeLocal(targetDate)}
                />
              </div>

              <button
                onClick={() => setShowResult(true)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              >
                Calculate
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {showResult && (
          <ResultDisplay 
            startDate={startDate}
            targetDate={targetDate}
          />
        )}
      </div>
    </div>
  );
}

export default App;