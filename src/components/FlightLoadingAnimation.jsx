import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';

const FlightPath = styled(Box)`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  z-index: 2;
`;

const AnimatedPlane = styled(SendIcon)`
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  animation: fly 2s ease-in-out infinite;
  font-size: 3rem;

  @media (prefers-color-scheme: dark) {
    color: #FFFFFF;
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
  }
  @media (prefers-color-scheme: light) {
    color: #1976D2;
    filter: drop-shadow(0 0 8px rgba(25, 118, 210, 0.5));
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    width: 200px;
    height: 2px;
    background: ${props => props.isDark 
      ? 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0) 100%)'
      : 'linear-gradient(90deg, rgba(25,118,210,0) 0%, rgba(25,118,210,0.8) 20%, rgba(25,118,210,0) 100%)'
    };
    transform: translateY(-50%);
  }

  @keyframes fly {
    0% {
      left: -50px;
      transform: translateY(-50%) rotate(0deg);
    }
    50% {
      left: 50%;
      transform: translateY(-50%) rotate(0deg);
    }
    100% {
      left: calc(100% + 50px);
      transform: translateY(-50%) rotate(0deg);
    }
  }
`;

const FlightLoadingAnimation = () => {
  return (
    <FlightPath>
      <AnimatedPlane />
    </FlightPath>
  );
};

export default FlightLoadingAnimation; 