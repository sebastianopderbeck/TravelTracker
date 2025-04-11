import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import FlightIcon from '@mui/icons-material/Flight';

const FlightPath = styled(Box)`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  z-index: 2;
`;

const AnimatedPlane = styled(FlightIcon)`
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%) rotate(0deg);
  animation: fly 2s ease-in-out infinite;
  color: #1976D2;
  font-size: 3rem;
  filter: drop-shadow(0 0 8px rgba(25, 118, 210, 0.5));

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