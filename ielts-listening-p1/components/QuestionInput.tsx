
import React from 'react';

interface QuestionInputProps {
  id: number;
  value: string;
  onChange: (id: number, value: string) => void;
  submissionStatus: 'idle' | 'submitted';
  correctAnswer: string;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ id, value, onChange, submissionStatus, correctAnswer }) => {
  const isCorrect = value.trim().toLowerCase() === correctAnswer.toLowerCase();
  const status = submissionStatus === 'idle' ? 'idle' : isCorrect ? 'correct' : 'incorrect';

  const baseInputClasses = "w-full rounded-lg border bg-white py-2 px-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-shadow disabled:bg-slate-100";
  let borderClasses = "border-slate-300";
  if (status === 'correct') borderClasses = "border-green-500 ring-1 ring-green-300";
  if (status === 'incorrect') borderClasses = "border-red-500 ring-1 ring-red-300";

  return (
    <div className="flex items-center space-x-2 my-2 w-full max-w-xs">
      <span className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-teal-500 text-white font-bold text-sm">{id}</span>
      <div className="w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(id, e.target.value)}
          className={`${baseInputClasses} ${borderClasses}`}
          disabled={submissionStatus === 'submitted'}
        />
        {status === 'incorrect' && (
          <p className="text-xs text-green-600 mt-1 font-semibold">
            Correct answer: {correctAnswer}
          </p>
        )}
      </div>
    </div>
  );
};
