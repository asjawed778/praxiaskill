import { useEffect, useRef } from 'react';
import { useAppTheme } from '../context/ThemeContext';
import logo from '../assets/logo-icon-transparent-bg.png';

const SplashScreen = () => {
  const { colors } = useAppTheme() || { 
    colors: { 
      background: '#f8f9fa', 
      primary: '#4361ee',
      secondary: '#3f37c9',
      accent: '#4895ef'
    } 
  };
  const logoRef = useRef(null);
  
  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.style.transform = 'scale(1)';
      logoRef.current.style.opacity = '1';
    }
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{
        backgroundColor: colors.background,
      }}
    >
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-repeat"
             style={{
               backgroundImage: `
                 linear-gradient(45deg, ${colors.primary} 1px, transparent 1px),
                 linear-gradient(-45deg, ${colors.secondary} 1px, transparent 1px)
               `,
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-5 animate-gradient-move"
             style={{ 
               backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
               backgroundSize: '300% 300%'
             }}>
        </div>
      </div>
      
      {[...Array(12)].map((_, i) => (
        <div key={i} 
             className="absolute rounded-full opacity-20"
             style={{
               width: `${Math.random() * 10 + 5}px`,
               height: `${Math.random() * 10 + 5}px`,
               backgroundColor: [colors.primary, colors.secondary, colors.accent][i % 3],
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               animation: `float-particle ${Math.random() * 10 + 10}s linear infinite`,
               animationDelay: `${Math.random() * 5}s`
             }}>
        </div>
      ))}
      
      <div className="relative flex flex-col items-center z-10" ref={logoRef}
           style={{
             transform: 'scale(0.8)',
             opacity: 0,
             transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease'
           }}>
        
        <div className="relative mb-6 p-1">
          <div className="absolute inset-0 rounded-full blur-lg opacity-0 animate-glow"
               style={{ 
                 backgroundColor: colors.primary,
                 animationDelay: '0.3s'
               }}>
          </div>
          
          <div className="relative w-28 h-28 rounded-2xl flex items-center justify-center z-10 overflow-hidden"
               style={{
                 backgroundColor: 'rgba(255, 255, 255, 0.9)',
                 boxShadow: `0 10px 30px -5px ${colors.primary}40`,
                 transformStyle: 'preserve-3d',
                 transform: 'perspective(1000px)'
               }}>
            <div className="absolute inset-0 opacity-30"
                 style={{ 
                   backgroundImage: `linear-gradient(45deg, ${colors.primary}, ${colors.accent})`
                 }}>
            </div>
            
            {/* Logo image with depth effect */}
            <img 
              src={logo} 
              alt="App Logo" 
              className="w-16 h-16 object-contain relative z-10"
              style={{
                filter: `drop-shadow(0 2px 4px ${colors.primary}60)`,
                transform: 'translateZ(20px)'
              }} 
            />
          </div>
        </div>
        
        <div className="relative mb-8 overflow-hidden">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent"
              style={{ 
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
                letterSpacing: '-0.5px'
              }}>
            Praxia Skill
          </h1>
        </div>
        
        <div className="relative w-64 h-1 rounded-full overflow-hidden bg-gray-200">
          <div className="absolute top-0 left-0 h-full rounded-full"
               style={{
                 width: '100%',
                 backgroundImage: `linear-gradient(to right, transparent, ${colors.primary}, transparent)`,
                 animation: 'youtube-loading 1.5s ease-in-out infinite'
               }}>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
        
        @keyframes glow {
          0%, 100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }
        
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes youtube-loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-float-particle {
          animation: float-particle linear infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-gradient-move {
          animation: gradient-move 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;