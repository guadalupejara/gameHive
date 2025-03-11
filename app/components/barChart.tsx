import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

interface BarChartProps {
  labels: string[];
  data: number[];
}

const BarChart: React.FC<BarChartProps> = ({ labels, data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Helper function to generate a random color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.2)`;
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Generate random colors for each data point
      const backgroundColors = data.map(() => getRandomColor());
      const borderColors = backgroundColors.map(color => color.replace('0.2', '1'));

      chartInstance.current = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: 'Test Taker Scores',
            data,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            }
          }
        }
      });
    }

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, data]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
