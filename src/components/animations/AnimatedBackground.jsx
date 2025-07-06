import React, { useState, useEffect } from 'react';
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
  20% {
    transform: translateX(20vw) translateY(-20px) rotate(5deg);
  }
  40% {
    transform: translateX(40vw) translateY(10px) rotate(-3deg);
  }
  60% {
    transform: translateX(60vw) translateY(-15px) rotate(2deg);
  }
  80% {
    transform: translateX(80vw) translateY(5px) rotate(-4deg);
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(calc(100vw + 100px)) translateY(0) rotate(0deg);
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
  20% {
    width: 50px;
  }
  40% {
    width: 100px;
  }
  60% {
    width: 150px;
  }
  80% {
    width: 200px;
  }
  90% {
    opacity: 0.3;
  }
  100% {
    width: 0;
    opacity: 0;
  }
`;

const BackgroundContainer = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  background: ${props => props.isDark 
    ? 'linear-gradient(45deg, #0a1929 0%, #1a237e 100%)'
    : '#F5F5F5'
  };
`;

const ThemeToggle = styled(IconButton)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid #0a1929;
  outline: 0;
  &:hover {
    border: 1px solid #0a1929;
    background-color: rgba(255, 255, 255, 0.2);
  }
  & .MuiSvgIcon-root {
    font-size: 1.8rem;
    color: ${props => props.isDark ? '#1976D2' : '#FFFFFF'};
  }
`;

const Country = styled(Box)`
  position: absolute;
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 1;
  opacity: ${props => props.isLoading ? 0 : 1};
  transition: opacity 0.5s ease-in-out;
  top: ${props => props.top};
  left: ${props => props.left};

  & .MuiSvgIcon-root {
    font-size: ${props => props.size};
    color: ${props => props.isDark ? props.darkColor : props.lightColor};
    filter: drop-shadow(0 0 8px rgba(0,0,0,0.1));
  }
`;

const Plane = styled(Box)`
  position: absolute;
  animation: ${planeAnimation} 30s linear infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 1;
  opacity: ${props => props.isLoading ? 0 : 1};
  transition: opacity 0.5s ease-in-out;
  top: ${props => props.top}%;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -400px;
    width: 400px;
    height: 2px;
    background: linear-gradient(
      to right,
      ${props => props.color}00,
      ${props => props.color}80,
      ${props => props.color}80,
      ${props => props.color}00
    );
    transform: translateY(-50%);
    animation: ${trailAnimation} 30s linear infinite;
    animation-delay: ${props => props.delay}s;
  }

  & .MuiSvgIcon-root {
    font-size: ${props => props.size};
    color: ${props => props.color};
    transform: rotate(90deg);
    filter: drop-shadow(0 0 4px ${props => props.color});
  }
`;

const PulsatingCircle = styled(Box)`
  position: absolute;
  border-radius: 50%;
  animation: ${pulse} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 0;
  opacity: ${props => props.isLoading ? 0 : 1};
  transition: opacity 0.5s ease-in-out;
  top: ${props => props.top};
  left: ${props => props.left};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  background: ${props => props.isDark 
    ? 'rgba(25, 118, 210, 0.1)'
    : 'rgba(100, 181, 246, 0.25)'
  };
`;

const AnimatedBackground = ({ isLoading = true }) => {
  const [isDark, setIsDark] = useState(() => {
    // Detectar el tema inicial del sistema
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true; // Valor por defecto
  });

  useEffect(() => {
    // Escuchar cambios en el tema del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setIsDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      <ThemeToggle onClick={toggleTheme} isDark={isDark}>
        {isDark ? <WbSunnyIcon sx={{ fill: 'white' }} /> : <DarkModeIcon sx={{ fill: 'black' }} />}
      </ThemeToggle>
      <BackgroundContainer isDark={isDark}>
        {/* Países flotantes */}
        <Country delay={0} top="7%" left="67%" size="4rem" isDark={isDark} darkColor="rgba(25, 118, 210, 0.9)" lightColor="rgba(211, 47, 47, 0.9)" isLoading={isLoading}>
          <PublicIcon />
        </Country>
        <Country delay={2} top="60%" left="80%" size="5rem" isDark={isDark} darkColor="rgba(46, 125, 50, 0.9)" lightColor="rgba(156, 39, 176, 0.9)" isLoading={isLoading}>
          <PublicIcon />
        </Country>
        <Country delay={4} top="30%" left="40%" size="3.5rem" isDark={isDark} darkColor="rgba(156, 39, 176, 0.9)" lightColor="rgba(255, 152, 0, 0.9)" isLoading={isLoading}>
          <PublicIcon />
        </Country>
        <Country delay={1} top="70%" left="20%" size="4.5rem" isDark={isDark} darkColor="rgba(211, 47, 47, 0.9)" lightColor="rgba(25, 118, 210, 0.9)" isLoading={isLoading}>
          <PublicIcon />
        </Country>
        <Country delay={3} top="40%" left="70%" size="3rem" isDark={isDark} darkColor="rgba(255, 152, 0, 0.9)" lightColor="rgba(46, 125, 50, 0.9)" isLoading={isLoading}>
          <PublicIcon />
        </Country>

        {/* Elementos pulsantes */}
        <PulsatingCircle delay={0} top="30%" right="30%" width="80px" height="80px" isDark={isDark} isLoading={isLoading} />
        <PulsatingCircle delay={1.5} bottom="40%" left="40%" width="100px" height="100px" isDark={isDark} isLoading={isLoading} />
        <PulsatingCircle delay={2} top="20%" left="20%" width="50px" height="50px" isDark={isDark} isLoading={isLoading} />

        {/* Nuevos círculos pulsantes */}
        <PulsatingCircle delay={0.5} top="10%" left="50%" width="60px" height="60px" isDark={isDark} isLoading={isLoading} />
        <PulsatingCircle delay={1} top="80%" right="20%" width="70px" height="70px" isDark={isDark} isLoading={isLoading} />
        <PulsatingCircle delay={2.5} top="50%" left="10%" width="90px" height="90px" isDark={isDark} isLoading={isLoading} />
        <PulsatingCircle delay={3} top="70%" left="60%" width="40px" height="40px" isDark={isDark} isLoading={isLoading} />
        <PulsatingCircle delay={3.5} top="40%" right="10%" width="55px" height="55px" isDark={isDark} isLoading={isLoading} />

        {/* Aviones sutiles */}
        <Plane delay={0} top={15} size="2rem" color={isDark ? "rgba(255, 152, 0, 0.9)" : "rgba(46, 125, 50, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
        <Plane delay={3} top={75} size="2.5rem" color={isDark ? "rgba(46, 125, 50, 0.9)" : "rgba(211, 47, 47, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
        <Plane delay={15} top={45} size="3rem" color={isDark ? "rgba(25, 118, 210, 0.9)" : "rgba(255, 152, 0, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
        <Plane delay={1} top={90} size="2rem" color={isDark ? "rgba(211, 47, 47, 0.9)" : "rgba(25, 118, 210, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
        <Plane delay={5} top={25} size="2.2rem" color={isDark ? "rgba(156, 39, 176, 0.9)" : "rgba(0, 150, 136, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
        <Plane delay={8} top={60} size="2.8rem" color={isDark ? "rgba(0, 150, 136, 0.9)" : "rgba(156, 39, 176, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
        <Plane delay={12} top={85} size="2.4rem" color={isDark ? "rgba(255, 87, 34, 0.9)" : "rgba(33, 150, 243, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
        <Plane delay={18} top={35} size="2.6rem" color={isDark ? "rgba(33, 150, 243, 0.9)" : "rgba(255, 87, 34, 0.9)"} isLoading={isLoading}>
          <FlightIcon />
        </Plane>
      </BackgroundContainer>
    </>
  );
};

export default AnimatedBackground; 