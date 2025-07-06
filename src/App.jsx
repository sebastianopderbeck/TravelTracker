import { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import AnimatedBackground from './components/animations/AnimatedBackground';
import FlightLoadingAnimation from './components/animations/FightLoadingAnimation';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState('history');
  const [isDark, setIsDark] = useState(() => {
    // Detectar el tema inicial del sistema
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Valor por defecto
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh', minHeight: '100vh', minWidth: '100vw', overflow: 'hidden' }}>
      <AnimatedBackground />
      {!showContent ? (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 2 
        }}>
          <FlightLoadingAnimation isDark={isDark} />
        </Box>
      ) : (
        <Fade in={showContent} timeout={1000}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            position: 'relative', 
            zIndex: 1,
            width: '100vw',
            height: '100vh',
            minHeight: '100vh',
            minWidth: '100vw',
            overflow: 'hidden'
          }}>
            <Sidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
            <Box sx={{ 
              flexGrow: 1, 
              ml: { xs: 0, md: '280px' }, 
              mt: { xs: 0, md: 0 },
              height: '100vh',
              overflow: 'auto',
              p: { xs: 1, md: 3 }
            }}>
              <MainContent activeSection={activeSection} />
            </Box>
          </Box>
        </Fade>
      )}
    </Box>
  );
}

export default App;
