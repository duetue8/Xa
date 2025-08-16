import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'vertical';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'horizontal',
  showText = true 
}) => {
  return (
    <div className={`flex ${variant === 'vertical' ? 'flex-col' : 'flex-row'} items-center ${className} group`}>
      {/* Logo Mark */}
      <div className="relative">
        <svg 
          viewBox="0 0 120 120" 
          className={`${variant === 'vertical' ? 'w-20 h-20 mb-4' : 'w-14 h-14 mr-4'} transform transition-transform duration-500 group-hover:scale-105`}
        >
          {/* Definitions */}
          <defs>
            {/* Main Gradient */}
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            
            {/* Accent Gradient */}
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#2DD4BF" />
            </linearGradient>

            {/* Glow Gradient */}
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>

            {/* Circuit Pattern */}
            <pattern id="circuitPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path 
                d="M0,10 h5 M15,10 h5 M10,0 v5 M10,15 v5"
                stroke="#34D399"
                strokeWidth="0.5"
                strokeOpacity="0.2"
              />
            </pattern>
          </defs>

          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="url(#mainGradient)"
            className="transform origin-center transition-transform duration-700"
          />

          {/* Circuit Pattern Overlay */}
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="url(#circuitPattern)"
            className="animate-[spin_30s_linear_infinite]"
          />

          {/* Outer Ring */}
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="url(#accentGradient)"
            strokeWidth="1"
            strokeDasharray="4 2"
            className="animate-[spin_20s_linear_infinite]"
          />

          {/* Q Letter */}
          <path
            d="M40,40 
               A20,20 0 1,1 40,80
               A20,20 0 1,1 40,40
               M40,75
               L55,90"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            className="drop-shadow-lg"
          />

          {/* E Letter */}
          <path
            d="M65,40 H90
               M65,60 H85
               M65,80 H90
               M65,40 V80"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            className="drop-shadow-lg"
          />

          {/* Animated Pulse Ring */}
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#glowGradient)"
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDuration: '3s' }}
          />

          {/* Data Points */}
          {[45, 60, 75].map((y, i) => (
            <circle
              key={i}
              cx="95"
              cy={y}
              r="1.5"
              fill="#FFFFFF"
              className="animate-pulse"
              style={{ 
                animationDelay: `${i * 0.3}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </svg>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-emerald-500 rounded-full filter blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
      </div>

      {/* Text Elements */}
      {showText && (
        <div className={`flex flex-col ${variant === 'vertical' ? 'text-center' : 'text-left'}`}>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent transform transition-all duration-500">
            Quick eLoans
          </span>
          {variant === 'horizontal' && (
            <div className="flex items-center space-x-2">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-sm font-medium text-emerald-600/80">
                Secure Financial Solutions
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;