import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const AnimatedNumber = ({ value, duration = 2000, unit = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value && !isAnimating) {
      setIsAnimating(true);
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const currentValue = Math.floor(startValue + (value - startValue) * progress);
        setDisplayValue(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
        }
      };

      animate();
    }
  }, [value, duration]);

  return (
    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
      {displayValue.toLocaleString()} {unit}
    </Typography>
  );
};

export default AnimatedNumber;