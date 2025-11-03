
import React, { useState, useCallback } from 'react';
import { QuestionInput } from './components/QuestionInput';
import { CORRECT_ANSWERS } from './constants';
import { ScriptContent } from './components/ScriptContent';
import { ChevronLeftIcon, ChevronRightIcon } from './components/ChevronIcons';

type SubmissionStatus = 'idle' | 'submitted';

const App: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [showScript, setShowScript] = useState<boolean>(false);

  const handleInputChange = useCallback((id: number, value: string) => {
    setUserAnswers(prev => ({ ...prev, [id]: value }));
  }, []);

  const handleCheckAnswers = () => {
    setSubmissionStatus('submitted');
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmissionStatus('idle');
  };

  const calculateScore = () => {
    return CORRECT_ANSWERS.reduce((score, correctAnswer, index) => {
      const questionId = index + 1;
      if (userAnswers[questionId]?.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const score = calculateScore();

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">IELTS Listening Practice</h1>
          <p className="text-lg text-slate-600 mt-2">Section 1: Complete the table below.</p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Audio Player</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border border-slate-200">
             <iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2205232663&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Hotels</h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="p-4 text-left font-bold text-slate-700 text-lg border-b-2 border-slate-300">Name</th>
                    <th className="p-4 text-left font-bold text-slate-700 text-lg border-b-2 border-slate-300">Location</th>
                    <th className="p-4 text-left font-bold text-slate-700 text-lg border-b-2 border-slate-300">Cost</th>
                    <th className="p-4 text-left font-bold text-slate-700 text-lg border-b-2 border-slate-300">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 align-top font-semibold text-slate-700">Belvedere Gardens Hotel</td>
                    <td className="p-4 align-top">Example: opposite Grimes Tower</td>
                    <td className="p-4 align-top">
                      $50 per night including
                      <QuestionInput id={1} value={userAnswers[1] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[0]}/>
                      breakfast
                    </td>
                    <td className="p-4 align-top">
                      highly recommended
                      <QuestionInput id={2} value={userAnswers[2] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[1]}/>
                      served each evening
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 align-top font-semibold text-slate-700">Belfield Grande</td>
                    <td className="p-4 align-top">
                      On the south side of Edgeware
                      <QuestionInput id={3} value={userAnswers[3] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[2]}/>
                    </td>
                    <td className="p-4 align-top">
                      $55 per night ($10 discount if
                      <QuestionInput id={4} value={userAnswers[4] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[3]}/>)
                    </td>
                    <td className="p-4 align-top">
                      price inclusive of
                      <QuestionInput id={5} value={userAnswers[5] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[4]}/>
                      served in the
                      <QuestionInput id={6} value={userAnswers[6] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[5]}/>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-4 align-top">
                      <QuestionInput id={7} value={userAnswers[7] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[6]}/>
                      Hotel
                    </td>
                    <td className="p-4 align-top">
                      At the entrance to the
                      <QuestionInput id={8} value={userAnswers[8] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[7]}/>
                      zone
                    </td>
                    <td className="p-4 align-top">
                      $28 weekdays and $40 on weekends and
                      <QuestionInput id={9} value={userAnswers[9] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[8]}/>
                    </td>
                    <td className="p-4 align-top">
                      must book well
                      <QuestionInput id={10} value={userAnswers[10] || ''} onChange={handleInputChange} submissionStatus={submissionStatus} correctAnswer={CORRECT_ANSWERS[9]}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <footer className="p-6 md:p-8 bg-slate-50 flex justify-between items-center">
             {submissionStatus === 'submitted' && (
                <div className="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Your Score: </strong>
                  <span className="block sm:inline">{score} / {CORRECT_ANSWERS.length}</span>
                </div>
              )}
            <div className="flex items-center space-x-2 ml-auto">
              <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 transition-colors" aria-label="Previous">
                <ChevronLeftIcon />
              </button>
              <button className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 transition-colors" aria-label="Next">
                <ChevronRightIcon />
              </button>
            </div>
          </footer>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleCheckAnswers}
            disabled={submissionStatus === 'submitted'}
            className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200"
          >
            Check Answers
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-8 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all duration-200"
          >
            Reset
          </button>
          <button
            onClick={() => setShowScript(!showScript)}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            {showScript ? 'Hide' : 'Show'} Script
          </button>
        </div>

        {showScript && <ScriptContent />}

      </main>
    </div>
  );
};

export default App;
