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
  color: ${props => props.isDark ? '#FFFFFF' : '#1976D2'};
  font-size: 3rem;
  filter: drop-shadow(0 0 8px ${props => props.isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(25, 118, 210, 0.5)'});

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

const Trail = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50vw;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    ${props => props.isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(25, 118, 210, 0)'} 0%,
    ${props => props.isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(25, 118, 210, 0.3)'} 50%,
    ${props => props.isDark ? 'rgba(255, 255, 255, 0)' : 'rgba(25, 118, 210, 0)'} 100%
  );
  transform: translateY(0) rotate(0deg);
  animation: trail 4s ease-in-out infinite;
  z-index: 1;
  @keyframes trail {
    0% {
      left: 0px;
      transform: translateY(-50%) rotate(0deg);
    }
    50% {
      left: 50vw;
      transform: translateY(-50%) rotate(0deg);
    }
    100% {
      left: 100vw;
      transform: translateY(-50%) rotate(0deg);
    }
  }
`;

const FlightLoadingAnimation = ({ isDark }) => {
  return (
    <FlightPath>
      <Trail isDark={isDark} />
      <AnimatedPlane isDark={isDark} />
    </FlightPath>
  );
};

export default FlightLoadingAnimation; 