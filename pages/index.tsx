import { useState, useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CrashGame = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const multiplier = useRef<number>(0);
  const [score, setScore] = useState<number>(0);
  const [xAxisMax, setXAxisMax] = useState<number>(5);
  const [yAxisMax, setYAxisMax] = useState<number>(5);
  const [crashPoint, setCrashPoint] = useState<number>(Math.random() * 50 + 1);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    chartInstance.current = new Chart(chartRef.current!, {
      type: "line",
      data: {
        datasets: [
          {
            data: [],
            fill: true,
            backgroundColor: "rgba(255, 0, 0, 0.8)",
            borderColor: "rgb(255, 255, 255)",
            borderWidth: 2,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: "linear",
            min: 0,
            max: xAxisMax,
            grid: {
              display: false,
            },
          },
          y: {
            min: 0,
            max: yAxisMax,
            grid: {
              display: false,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [xAxisMax, yAxisMax]);

  const startGame = () => {
    multiplier.current = 0;
    setXAxisMax(5);
    setYAxisMax(5);
    setCrashPoint(Math.random() * 50 + 1);
    chartInstance.current!.data.datasets![0].data = [{ x: 0, y: 0 }];
    chartInstance.current!.update();

    const interval = setInterval(() => {
      let newMultiplier = multiplier.current;
      newMultiplier += 0.01;
      multiplier.current = newMultiplier;
      chartInstance.current!.data.datasets![0].data!.push({
        x: newMultiplier,
        y: newMultiplier,
      });
      chartInstance.current!.update();

      if (newMultiplier > yAxisMax) {
        setYAxisMax(newMultiplier + 2);
      }

      if (newMultiplier > xAxisMax) {
        setXAxisMax(newMultiplier + 2);
      }

      if (newMultiplier >= crashPoint) {
        clearInterval(interval);
        gameInterval.current = null;
      }
    }, 100);

    gameInterval.current = interval;
  };

  const cashOut = () => {
    setScore(multiplier.current);
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
      gameInterval.current = null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <canvas ref={chartRef} className="w-5/6 h-1/2 mt-10 mb-5 shadow-lg" />
      <div className="text-4xl font-bold">{multiplier.current.toFixed(2)}x</div>
      <div className="flex flex-row">
        <button
          onClick={startGame}
          disabled={!!gameInterval.current}
          className="px-4 mr-4 py-2 mt-5 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none"
        >
          Start Game
        </button>
        <button
          onClick={cashOut}
          disabled={!gameInterval.current}
          className="px-4 py-2 mt-5 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none"
        >
          Cash Out
        </button>
      </div>
    </div>
  );
};

export default CrashGame;
