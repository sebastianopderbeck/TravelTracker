import React, { useState } from 'react';
import { Box, keyframes, IconButton } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styled from '@emotion/styled';

const float = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.9;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
`;

const planeAnimation = keyframes`
  0% {
    transform: translateX(-100px) translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 100px)) translateY(100px) rotate(10deg);
    opacity: 0;
  }
`;

const trailAnimation = keyframes`
  0% {
    width: 0;
    opacity: 0;
  }
  10% {
    opacity: 0.3;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    width: 200px;
    opacity: 0;
  }
`;

const Country = ({ delay, top, left, size, color }) => (
  <Box
    sx={{
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      animation: `${float} 8s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      zIndex: 1,
    }}
  >
    <PublicIcon
      sx={{
        fontSize: size,
        color: color,
        filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.1))',
      }}
    />
  </Box>
);

const Plane = ({ delay, top, size, color }) => (
  <Box
    sx={{
      position: 'absolute',
      top: `${top}%`,
      left: 0,
      animation: `${planeAnimation} 20s linear infinite`,
      animationDelay: `${delay}s`,
      zIndex: 1,
    }}
  >
    <Box
      sx={{
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '-200px',
          height: '2px',
          background: `linear-gradient(to right, ${color}00, ${color}80)`,
          animation: `${trailAnimation} 15s linear infinite`,
          animationDelay: `${delay}s`,
          transform: 'translateY(-50%)',
        },
      }}
    >
      <FlightIcon
        sx={{
          fontSize: size,
          color: color,
          transform: 'rotate(90deg)',
          opacity: 0.7,
        }}
      />
    </Box>
  </Box>
);

const BackgroundContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
`;

const ThemeToggle = styled(IconButton)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  & .MuiSvgIcon-root {
    font-size: 1.8rem;
    color: ${props => props.isDark ? '#1976D2' : '#FFFFFF'};
  }
`;

const AnimatedBackground = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <ThemeToggle onClick={toggleTheme} isDark={isDark}>
        {isDark ? <DarkModeIcon />: <WbSunnyIcon /> }
      </ThemeToggle>
      <BackgroundContainer>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: isDark 
              ? '#FFFFFF'
              : 'linear-gradient(45deg, #0a1929 0%, #1a237e 100%)',
            opacity: isDark ? 1 : 0.2,
            animation: 'gradient 15s ease infinite',
            '@keyframes gradient': {
              '0%': {
                backgroundPosition: '0% 50%',
              },
              '50%': {
                backgroundPosition: '100% 50%',
              },
              '100%': {
                backgroundPosition: '0% 50%',
              },
            },
          }}
        />
        {/* Países flotantes */}
        <Country delay={0} top={7} left={67} size="4rem" color={isDark ? "rgba(25, 118, 210, 0.9)" : "rgba(211, 47, 47, 0.9)" } />
        <Country delay={2} top={60} left={80} size="5rem" color={isDark ? "rgba(46, 125, 50, 0.9)" : "rgba(156, 39, 176, 0.9)"} />
        <Country delay={4} top={30} left={40} size="3.5rem" color={isDark ? "rgba(156, 39, 176, 0.9)" : "rgba(255, 152, 0, 0.9)"} />
        <Country delay={1} top={70} left={20} size="4.5rem" color={isDark ? "rgba(211, 47, 47, 0.9)" : "rgba(25, 118, 210, 0.9)"} />
        <Country delay={3} top={40} left={70} size="3rem" color={isDark ? "rgba(255, 152, 0, 0.9)" : "rgba(46, 125, 50, 0.9)" } />
        <Country delay={1} top={80} left={70} size="4rem" color={isDark ? "rgba(156, 39, 176, 0.9)" : "rgba(211, 47, 47, 0.9)"} />
        <Country delay={6} top={90} left={90} size="3rem" color={isDark ? "rgba(46, 125, 50, 0.9)" : "rgba(255, 152, 0, 0.9)"} />

        {/* Elementos pulsantes */}
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            right: '30%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: isDark ? 'rgba(25, 118, 210, 0.02)' : 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
            animation: `${pulse} 4s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '40%',
            left: '40%',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: isDark ? 'rgba(25, 118, 210, 0.01)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(5px)',
            animation: `${pulse} 5s ease-in-out infinite`,
            animationDelay: '1.5s',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '90%',
            left: '20%',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: isDark ? 'rgba(25, 118, 210, 0.01)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(5px)',
            animation: `${pulse} 5s ease-in-out infinite`,
            animationDelay: '1.5s',
          }}
        />
        {/* Aviones sutiles */}
        <Plane delay={0} top={15} size="2rem" color={isDark ? "rgba(255, 152, 0, 0.9)" : "rgba(46, 125, 50, 0.9)"} />
        <Plane delay={3} top={75} size="2.5rem" color={isDark ? "rgba(46, 125, 50, 0.9)" : "rgba(211, 47, 47, 0.9)"} />
        <Plane delay={15} top={45} size="3rem" color={isDark ?  "rgba(25, 118, 210, 0.9)" : "rgba(255, 152, 0, 0.9)"} />
        <Plane delay={1} top={90} size="2rem" color={isDark ? "rgba(211, 47, 47, 0.9)" : "rgba(25, 118, 210, 0.9)"} />
      </BackgroundContainer>
    </>
  );
};

export default AnimatedBackground; 