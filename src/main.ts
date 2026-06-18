import './styles/main.css';

const provisionalMessages = [
  'Labirinto Lumina',
  'Projeto inicializado.',
  'Gameplay ainda não implementado.',
  'Desenvolvido integralmente por IA com GPT-5.5, sob direção humana.',
] as const;

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Elemento raiz #app não encontrado.');
}

const canvas = document.createElement('canvas');
canvas.className = 'lumina-canvas';
canvas.setAttribute('role', 'img');
canvas.setAttribute('aria-label', provisionalMessages.join(' '));
app.append(canvas);

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('Canvas 2D não está disponível neste navegador.');
}

const renderProvisionalScreen = (): void => {
  const pixelRatio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#061015');
  gradient.addColorStop(0.58, '#10232a');
  gradient.addColorStop(1, '#271c10');
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'rgba(114, 225, 217, 0.16)';
  context.lineWidth = 1;

  for (let x = 32; x < width; x += 64) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 32; y < height; y += 64) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#f5fbf8';
  context.font = '700 40px system-ui, sans-serif';
  context.fillText(provisionalMessages[0], width / 2, height / 2 - 84);

  context.fillStyle = '#9ddfd8';
  context.font = '600 22px system-ui, sans-serif';
  context.fillText(provisionalMessages[1], width / 2, height / 2 - 26);

  context.fillStyle = '#f0c978';
  context.font = '500 20px system-ui, sans-serif';
  context.fillText(provisionalMessages[2], width / 2, height / 2 + 24);

  context.fillStyle = '#c9d8d8';
  context.font = '400 16px system-ui, sans-serif';
  context.fillText(provisionalMessages[3], width / 2, height / 2 + 78);
};

renderProvisionalScreen();
window.addEventListener('resize', renderProvisionalScreen);
