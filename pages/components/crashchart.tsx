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

  const plugin = {
    id: "customIconPlugin",
    afterDraw: (chart: any) => {
      const ctx = chart.ctx;
      const lastPoint =
        chart.data.datasets[0].data[chart.data.datasets[0].data.length - 1];

      if (lastPoint && ctx) {
        const xPoint = chart.scales.x.getPixelForValue(lastPoint.x);
        const yPoint = chart.scales.y.getPixelForValue(lastPoint.y);

        const myIcon = new Image();
        myIcon.src = "/love.svg";

        ctx.drawImage(
          myIcon,
          xPoint - myIcon.width / 2 + 50,
          yPoint - myIcon.height / 2 + 55,
          40,
          40
        );
      }
    },
  };

  useEffect(() => {
    Chart.register(plugin);
    return () => {
      Chart.unregister(plugin);
    };
  }, []);

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
            data: [{ x: 0, y: 0 }],
            fill: "start",
            borderColor: "rgb(255, 255, 255)",
            backgroundColor: "rgba(255, 0, 0, 0.4)",
            borderWidth: 15,
            tension: 0,
            pointRadius: 0,
            pointHoverRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 0, // Duration in milliseconds.
          easing: "linear", // Easing function to use. Some options are 'linear', 'easeOutQuad', 'easeInOutQuad', etc.
        },
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

        if (
          newMultiplier >
          Number(chartInstance.current?.options.scales?.y?.max || 0)
        ) {
          if (chartInstance.current?.options.scales?.y) {
            chartInstance.current.options.scales.y.max = newMultiplier + 2;
          }
          if (chartInstance.current?.options.scales?.x) {
            chartInstance.current.options.scales.x.max = newMultiplier + 2;
          }
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
    <div className="flex flex-col items-center  justify-center  text-white">
      <div className="w-full bg-[#1a2c38] px-[20px] rounded-lg  relative">
        <canvas ref={chartRef} className="w-5/6 h-1/2 mt-10 mb-5 shadow-lg" />
        <div className="text-[70px] font-bold absolute top-[30%] left-[40%]">
          {isNaN(multiplier) ? "0.00" : multiplier.toFixed(2)}x
        </div>
      </div>

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
