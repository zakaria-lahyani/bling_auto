'use client'

import { useState, useEffect } from 'react';
import { Droplets } from 'lucide-react';

interface LoadingPageProps {
  onComplete: () => void;
}

const LoadingPage = ({ onComplete }: LoadingPageProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    'Analyzing dirt level...',
    'Applying soap...',
    'Scrubbing surface...',
    'Rinsing thoroughly...',
    'Drying and polishing...',
    'Spotless finish!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        
        const newProgress = prev + Math.random() * 3 + 1;
        const stageIndex = Math.min(Math.floor((newProgress / 100) * stages.length), stages.length - 1);
        setCurrentStage(stageIndex);
        
        return Math.min(newProgress, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete, stages.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-teal-600 rounded-2xl">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Premium Wash</h1>
          </div>
          <p className="text-slate-300 text-lg">Getting your experience ready...</p>
        </div>

        {/* Car Animation Container */}
        <div className="relative mb-8">
          <div className="relative w-80 h-48 mx-auto bg-gradient-to-b from-slate-700 to-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Dirty Car Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://www.shutterstock.com/image-vector/dirty-clean-car-after-washing-260nw-2268455859.jpg')`,
                opacity: Math.max(0, 1 - (progress / 100))
              }}
            />
            
            {/* Clean Car Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
              style={{
                backgroundImage: `url('https://www.superiorcarwashsupply.com//images/640/Blog/Spotless%20and%20Shiny%20Clean%20Car.jpg')`,
                opacity: Math.min(1, progress / 100)
              }}
            />

            {/* Cleaning Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 transition-transform duration-1000"
              style={{
                transform: `translateX(${-100 + (progress * 1.2)}%) skewX(-12deg)`,
                width: '120%'
              }}
            />

            {/* Water Droplets Effect */}
            {progress > 20 && progress < 80 && (
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-6 bg-blue-400 opacity-60 rounded-full animate-pulse"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${10 + (i % 3) * 15}%`,
                      animationDelay: `${i * 200}ms`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Sparkle Effect for Clean Car */}
            {progress > 80 && (
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-yellow-300 text-xl animate-ping"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${20 + (i % 2) * 40}%`,
                      animationDelay: `${i * 300}ms`,
                      animationDuration: '2s'
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="relative">
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse" />
              </div>
            </div>
            <div className="absolute right-0 -mt-8 text-teal-400 font-bold text-sm">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Current Stage */}
          <div className="min-h-[1.5rem]">
            <p className="text-slate-300 text-sm animate-fade-in">
              {stages[currentStage]}
            </p>
          </div>

          {/* Completion Message */}
          {progress === 100 && (
            <div className="mt-6 animate-bounce">
              <p className="text-teal-400 font-semibold text-lg">
                🎉 Perfect! Your car wash experience is ready!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 text-blue-300 opacity-30 animate-float">
        <Droplets size={24} />
      </div>
      <div className="absolute bottom-20 right-16 text-teal-300 opacity-30 animate-float-delayed">
        <Droplets size={20} />
      </div>
      <div className="absolute top-1/3 right-8 text-blue-400 opacity-20 animate-float">
        <Droplets size={16} />
      </div>
    </div>
  );
};

export default LoadingPage;