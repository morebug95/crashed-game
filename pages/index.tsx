import { useState, useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CrashGame = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const gameInterval = useRef<NodeJS.Timeout | null>(null);
  const [multiplier, setMultiplier] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [crashPoint, setCrashPoint] = useState<number>(Math.random() * 50 + 1);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }

    const newChart = new Chart(chartRef.current!, {
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
            max: 5,
            grid: {
              display: false,
            },
          },
          y: {
            min: 0,
            max: 5,
            grid: {
              display: false,
            },
          },
        },
      },
    });

    chartInstance.current = newChart;

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  const startGame = () => {
    setMultiplier(0);
    setCrashPoint(Math.random() * 50 + 1);
    chartInstance.current!.data.datasets![0].data = [{ x: 0, y: 0 }];

    const interval = setInterval(() => {
      setMultiplier((prevMultiplier) => {
        const newMultiplier = prevMultiplier + 0.01;

        if (newMultiplier > chartInstance.current!.options.scales.y.max!) {
          chartInstance.current!.options.scales.y.max = newMultiplier + 2;
          chartInstance.current!.options.scales.x.max = newMultiplier + 2;
        }

        chartInstance.current!.data.datasets![0].data!.push({
          x: newMultiplier,
          y: newMultiplier,
        });

        if (newMultiplier >= crashPoint) {
          clearInterval(interval);
          gameInterval.current = null;
        }

        chartInstance.current!.update();
        return newMultiplier;
      });
    }, 100);

    gameInterval.current = interval;
  };

  const cashOut = () => {
    setScore(multiplier);
    if (gameInterval.current) {
      clearInterval(gameInterval.current);
      gameInterval.current = null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <canvas ref={chartRef} className="w-5/6 h-1/2 mt-10 mb-5 shadow-lg" />
      <div className="text-4xl font-bold">{multiplier.toFixed(2)}x</div>
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
