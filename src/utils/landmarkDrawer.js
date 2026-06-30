export function drawLandmarks(ctx, landmarks) {
  ctx.fillStyle = "#00FF00";

  landmarks.forEach((point) => {
    ctx.beginPath();
    ctx.arc(
      point.x * ctx.canvas.width,
      point.y * ctx.canvas.height,
      5,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });
}