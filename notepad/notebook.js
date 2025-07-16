const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
let drawing = false;
let tool = 'pen';

let lastX = 0;
let lastY = 0;

function setTool(selected) {
  tool = selected;
}

canvas.addEventListener('pointerdown', e => {
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
});

canvas.addEventListener('pointermove', e => {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.strokeStyle = tool === 'pen' ? '#000000' : '#ffffff';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
});

canvas.addEventListener('pointerup', () => drawing = false);
canvas.addEventListener('pointerleave', () => drawing = false);

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

// Initialize white background
clearCanvas();

