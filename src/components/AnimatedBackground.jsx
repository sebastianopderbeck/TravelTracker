import React from 'react';
import { Box, keyframes } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import PublicIcon from '@mui/icons-material/Public';

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

const AnimatedBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {/* Países flotantes */}
      <Country delay={0} top={7} left={50} size="4rem" color="rgba(25, 118, 210, 0.7)" />
      <Country delay={2} top={60} left={80} size="5rem" color="rgba(46, 125, 50, 0.6)" />
      <Country delay={4} top={30} left={40} size="3.5rem" color="rgba(156, 39, 176, 0.5)" />
      <Country delay={1} top={70} left={20} size="4.5rem" color="rgba(211, 47, 47, 0.6)" />
      <Country delay={3} top={40} left={70} size="3rem" color="rgba(255, 152, 0, 0.7)" />
      
      {/* Elementos pulsantes */}
      <Box
        sx={{
          position: 'absolute',
          top: '30%',
          right: '30%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.25)',
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
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          animation: `${pulse} 5s ease-in-out infinite`,
          animationDelay: '1.5s',
        }}
      />

      {/* Aviones sutiles */}
      <Plane delay={0} top={15} size="2rem" color="rgba(255, 255, 255, 0.8)" />
      <Plane delay={8} top={75} size="2.5rem" color="rgba(255, 255, 255, 0.6)" />
      <Plane delay={15} top={45} size="3rem" color="rgba(255, 255, 255, 0.4)" />
    </Box>
  );
};

export default AnimatedBackground; 