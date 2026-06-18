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
  'Labirinto Lumina. Tela inicial funcional. Gameplay ainda não implementado.',
);
app.append(canvas);

const game = new Game({ canvas });
game.start();

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    game.stop();
  });
}
