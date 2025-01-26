const { createCanvas } = require("canvas");
const fs = require("fs");

const canvas = createCanvas(500, 500);
const ctx = canvas.getContext("2d");

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rotation = (Math.PI / 2) * 3; // Start angle
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes; // Angle between points

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius); // Move to the top point

  // Loop through the points of the star
  for (let i = 0; i < spikes; i++) {
    // Outer point
    x = cx + Math.cos(rotation) * outerRadius;
    y = cy + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);

    rotation += step;

    // Inner point
    x = cx + Math.cos(rotation) * innerRadius;
    y = cy + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);

    rotation += step;
  }

  ctx.lineTo(cx, cy - outerRadius); // Close the path
  ctx.closePath();

  // Styling
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#000"; // Black border
  ctx.stroke();
  ctx.fillStyle = "#FFD700"; // Gold fill
  ctx.fill();
}

// Draw the star in the center of the canvas
drawStar(ctx, 250, 250, 5, 100, 50);

// Save the canvas to a file
const out = fs.createWriteStream(__dirname + "/star.png");
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on("finish", () => console.log("Star image created: star.png"));
