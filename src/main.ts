import './styles/main.css';
import { Game } from './game/Game';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('Elemento raiz #app não encontrado.');
}

const canvas = document.createElement('canvas');
canvas.className = 'lumina-canvas';
canvas.setAttribute(
  'aria-label',
  'Labirinto Lumina. Primeira fase navegável com movimento em grid e colisão com paredes.',
);
app.append(canvas);

const game = new Game({ canvas });
game.start();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    game.stop();
  });
}
