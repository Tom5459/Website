const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
let drawing = false;
let tool = 'pen';

function setTool(selected) {
  tool = selected;
}

canvas.addEventListener('pointerdown', startDraw);
canvas.addEventListener('pointermove', draw);
canvas.addEventListener('pointerup', () => drawing = false);
canvas.addEventListener('pointerleave', () => drawing = false);

function startDraw(e) {
  drawing = true;
  draw(e); // draw a dot
}

function draw(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.fillStyle = tool === 'pen' ? '#000000' : '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2); // dot size
  ctx.fill();
}

function clearCanvas() {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const link = document.createElement('a');
  link.download = `note-${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// Initialize blank white canvas
clearCanvas();
