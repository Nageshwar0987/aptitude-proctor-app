'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SAMPLE_QUESTIONS } from '@/data/questions';
import { Camera, Clock, ShieldCheck, Video, Mic } from 'lucide-react';

export default function ExamRoom() {
  const [step, setStep] = useState<'permissions' | 'preview' | 'exam' | 'submitted'>('permissions');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState('');
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [violations, setViolations] = useState(0);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);

  // Step 1: Request browser camera and microphone permissions
  const requestMediaAccess = async () => {
    try {
      setPermissionError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      setStep('preview'); // Move to live preview step
    } catch (err) {
      console.error(err);
      setPermissionError('Camera and microphone access is mandatory to start the proctored exam. Please allow access.');
    }
  };

  // Attach media stream to preview video element when on preview step
  useEffect(() => {
    if (step === 'preview' && previewVideoRef.current && stream) {
      previewVideoRef.current.srcObject = stream;
    }
  }, [step, stream]);

  // Attach media stream to hidden background video element when exam starts
  useEffect(() => {
    if (step === 'exam' && backgroundVideoRef.current && stream) {
      backgroundVideoRef.current.srcObject = stream;
    }
  }, [step, stream]);

  const startActualExam = () => {
    setStep('exam');
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const handleViolation = useCallback((type: 'tab' | 'fullscreen') => {
    setViolations(prev => {
      const nextCount = prev + 1;
      if (nextCount >= 3) {
        alert("Maximum violation limit reached (3/3). Your exam is being auto-submitted.");
        submitExam();
      } else {
        alert(`Warning ${nextCount}/3: ${type === 'tab' ? 'Tab switch or window blur' : 'Fullscreen exit'} detected!`);
      }
      return nextCount;
    });
  }, []);

  useEffect(() => {
    if (step !== 'exam') return;

    const onVisibilityChange = () => {
      if (document.hidden) handleViolation('tab');
    };

    const onFullscreenChange = () => {
      if (!document.fullscreenElement) handleViolation('fullscreen');
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    document.addEventListener('fullscreenchange', onFullscreenChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, [step, handleViolation]);

  useEffect(() => {
    if (step !== 'exam') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    setAnswers({ ...answers, [currentQuestion]: optIdx });
  };

  const submitExam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setStep('submitted');
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Hidden video element keeping background camera stream alive during exam */}
      <video ref={backgroundVideoRef} autoPlay playsInline muted className="hidden" />

      {/* STEP 1: Initial Prompt Screen */}
      {step === 'permissions' && (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Proctored Aptitude Test</h1>
          <p className="text-slate-600 text-sm mb-6">
            This test requires camera and microphone permissions for background AI proctoring and integrity checks.
          </p>

          {permissionError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg text-left">
              {permissionError}
            </div>
          )}

          <button
            onClick={requestMediaAccess}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-indigo-100"
          >
            Allow Camera & Microphone Access
          </button>
        </div>
      )}

      {/* STEP 2: Live Camera Check Preview Screen */}
      {step === 'preview' && (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center border border-slate-200">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Camera & Audio Check</h1>
          <p className="text-slate-500 text-xs mb-4">Make sure your face is clearly visible and lighting is adequate.</p>
          
          <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden mb-6 shadow-inner flex items-center justify-center">
            <video ref={previewVideoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Camera & Mic Connected
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 text-left text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-indigo-600" /> Webcam Active
            </div>
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-600" /> Audio Feed Ready
            </div>
          </div>

          <button
            onClick={startActualExam}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition shadow-md shadow-indigo-100"
          >
            Start Exam Now
          </button>
        </div>
      )}

      {/* STEP 3: Actual Exam Room (Camera runs quietly in background) */}
      {step === 'exam' && (
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 border border-slate-200 min-h-[550px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full">
                  Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}
                </span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Background Proctored
                </span>
              </div>
              <div className="flex items-center space-x-2 text-slate-700 font-mono text-sm bg-slate-100 px-3 py-1 rounded-lg">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              {SAMPLE_QUESTIONS[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {SAMPLE_QUESTIONS[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition flex items-center space-x-3 ${
                    answers[currentQuestion] === idx
                      ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-medium'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    answers[currentQuestion] === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
            <button
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="px-5 py-2.5 border border-slate-300 rounded-xl text-slate-600 hover:bg-slate-50 disabled:opacity-40 text-sm font-medium"
            >
              Previous
            </button>

            {currentQuestion < SAMPLE_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(prev => prev + 1)}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-sm font-medium"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={submitExam}
                className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 text-sm font-semibold shadow-md shadow-emerald-100"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      )}

      {/* STEP 4: Submission Confirmation Screen */}
      {step === 'submitted' && (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Thank you for submitting!</h1>
          <p className="text-slate-600 text-sm mb-6">
            Now attempt technical assessment.
          </p>
        </div>
      )}
    </main>
  );
}