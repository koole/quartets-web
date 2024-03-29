import { useEffect, useRef } from "react";
import { COMBINATIONS, PLAYERS } from "./simplified_cards";

const CANVAS_SIZE = 250;
const SCALE = 3;

export default function KripkeModelStart({}: {}) {
  // Canvas element in this react component with a re
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_SIZE * SCALE;
    canvas.height = CANVAS_SIZE * SCALE;
    ctx.scale(SCALE, SCALE);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a circle of dots, with each dot being one item in the combinations variable
    const center = CANVAS_SIZE / 2;
    const dotRadius = 0.5;
    const radius = CANVAS_SIZE / 2 - dotRadius * 10;

    // abelard: ["red-0", "green-0"],
    // heloise: ["red-1", "yellow-0"],
    // player: ["green-1", "yellow-1"],

    const filtered_combinations = COMBINATIONS.filter((combination) => {
      return (
        (combination.abelard.includes("red-0") &&
          combination.abelard.includes("green-0")) ||
        (combination.heloise.includes("red-1") &&
          combination.heloise.includes("yellow-0")) ||
        (combination.player.includes("green-1") &&
          combination.player.includes("yellow-1"))
      );
    });

    const dotPositions = filtered_combinations.map((_, i) => {
      const angle = (2 * Math.PI * i) / filtered_combinations.length;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
        combination: filtered_combinations[i],
      };
    });

    // Draw the lines between the dots
    const lineThickness = 0.3;

    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      lineColor: string
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = lineThickness;
      ctx.strokeStyle = lineColor;
      ctx.stroke();
    };

    const PLAYER_COLORS = ["#3c82f6", "#ef4444", "#22c55d"];

    // NEXT STATE: ALL PLAYERS HAVE LOOKED AT THEIR CARDS
    const knownCards = {
      abelard: ["red-0", "green-0"],
      heloise: ["red-1", "yellow-0"],
      player: ["green-1", "yellow-1"],
    };
    PLAYERS.forEach((player, player_i) => {
      dotPositions.forEach(({ x: x1, y: y1, combination: c1 }, i) => {
        dotPositions.forEach(({ x: x2, y: y2, combination: c2 }, j) => {
          if (
            i < j &&
            ((c1[player][0] === c2[player][0] &&
              c1[player][1] === c2[player][1]) ||
              (c1[player][0] === c2[player][1] &&
                c1[player][1] === c2[player][0])) &&
            knownCards[player].includes(c1[player][0]) &&
            knownCards[player].includes(c1[player][1])
          ) {
            drawLine(x1, y1, x2, y2, PLAYER_COLORS[player_i]);
          }
        });
      });
    });

    dotPositions.forEach(({ x, y, combination }, i) => {
      ctx.beginPath();
      if (
        combination.abelard.includes("red-0") &&
        combination.abelard.includes("green-0") &&
        combination.heloise.includes("red-1") &&
        combination.heloise.includes("yellow-0") &&
        combination.player.includes("green-1") &&
        combination.player.includes("yellow-1")
      ) {
        ctx.fillStyle = "#22c55d";
        ctx.strokeStyle = "white"
        ctx.arc(x, y, dotRadius * 7, 0, 2 * Math.PI);
      } else {
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black"
        ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
      }
      ctx.fill();
      ctx.stroke();
    });
  }, []);

  return <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="w-3/5 mx-auto my-10" />;
}
