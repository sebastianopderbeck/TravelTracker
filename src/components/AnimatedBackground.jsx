import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

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

const AnimatedBackground = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {/* Círculos flotantes */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(5px)',
          animation: `${float} 6s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(5px)',
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '1s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '20%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          animation: `${float} 7s ease-in-out infinite`,
          animationDelay: '2s',
        }}
      />
      
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
    </Box>
  );
};

export default AnimatedBackground; 